import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Sud } from 'src/app/models/sud';
import { SudService } from 'src/app/services/sud.service';
import {MatDialog} from '@angular/material/dialog';
import {SudDialogComponent} from 'src/app/dialogs/sud-dialog/sud-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sud',
  templateUrl: './sud.component.html',
  styleUrls: ['./sud.component.css']
})
export class SudComponent implements OnInit, OnDestroy{

    displayedColumns = ['id', 'naziv', 'adresa', 'actions' ];
    dataSource!:MatTableDataSource<Sud>;
    subscription!:Subscription;

    @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static:false})sort!: MatSort;

    constructor(private service:SudService, public dialog:MatDialog) {}
  
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

   ngOnInit() :void {
  this.loadData();
  }

  public loadData() {
    this.subscription = this.service.getAllSuds().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag:number, id?:number, naziv?:string, adresa?:string) {
  const dialogRef = this.dialog.open(SudDialogComponent, {data: {id, naziv, adresa,}});
  dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      (result) => {
        (result == 1)
          this.loadData();
       }
     )    
   }

   public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }
  
}
