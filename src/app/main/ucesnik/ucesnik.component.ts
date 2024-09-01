import { UcesnikService } from './../../services/ucesnik.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UcesnikDialogComponent } from 'src/app/dialogs/ucesnik-dialog/ucesnik-dialog.component';
import { Ucesnik } from 'src/app/models/ucesnik';

@Component({
  selector: 'app-ucesnik',
  templateUrl: './ucesnik.component.html',
  styleUrls: ['./ucesnik.component.css']
})
export class UcesnikComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'ime', 'prezime', 'mbr', 'status', 'actions'];
  dataSource!:MatTableDataSource<Ucesnik>;
  subscription!: Subscription;

  constructor(private UcesnikService: UcesnikService, public dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static:false})sort!: MatSort;
  
  public loadData() {
    this.subscription = this.UcesnikService.getAllUcesnik().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name +' ' + error.message);
      };
    }   

  public openDialog(flag: number, id: number, ime: string, prezime: string, mbr: string, status: string) {
    const dialog = this.dialog.open(UcesnikDialogComponent, {data: {id: id, ime: ime, prezime: prezime, mbr: mbr, status: status}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }
}


