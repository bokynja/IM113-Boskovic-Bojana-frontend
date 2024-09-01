import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PredmetService } from './../../services/predmet.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Predmet } from 'src/app/models/predmet';
import { Sud } from 'src/app/models/sud';
import { PredmetDialogComponent } from 'src/app/dialogs/predmet-dialog/predmet-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit, OnDestroy, OnChanges {
  dataSource!: MatTableDataSource<Predmet>;
  displayedColumns = ['id', 'brojPr', 'opis', 'datumPocetka', 'aktivan', 'sud', 'actions']
  subscription!: Subscription;
  parentSelectedPredmet!: Predmet;

  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static:false})sort!: MatSort;

  constructor (private predmetService: PredmetService, public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  public selectRow(row: Predmet) {
    this.parentSelectedPredmet = row;
  }

  public loadData() {
    this.subscription = this.predmetService.getAllPredmets().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name +' ' + error.message);
      };
    }   
  
  public openDialog(flag:number, id?:number, brojPr?:string, opis?:string, datumPocetka?:Date, aktivan?:boolean, sud?:Sud):void {
    const dialogRef = this.dialog.open(PredmetDialogComponent, {data:{id, brojPr, opis, datumPocetka, aktivan, sud}})
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == 1) {
          this.loadData();
        }
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
