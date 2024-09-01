import { Subscription } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RocisteDialogComponent } from 'src/app/dialogs/rociste-dialog/rociste-dialog.component';
import { Predmet } from 'src/app/models/predmet';
import { Rociste } from 'src/app/models/rociste';
import { Ucesnik } from 'src/app/models/ucesnik';
import { RocisteService } from 'src/app/services/rociste.service';


@Component({
  selector: 'app-rociste',
  templateUrl:'./rociste.component.html',
  styleUrls: ['./rociste.component.css']
})
export class RocisteComponent implements OnChanges {

  displayedColumns = ['id', 'datumrocista', 'sudnica', 'ucesnik', 'predmet', 'actions'];
  dataSource!: MatTableDataSource<Rociste>;
  subscription!: Subscription;
  predmet!: Predmet;

  ucesnik!: Ucesnik;

  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static:false})sort!: MatSort;

  @Input()childSelectedPredmet!: Predmet;
  constructor(public rocisteService: RocisteService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes : SimpleChanges): void {
      this.loadData();
  }

  public loadData() {
    this.subscription = this.rocisteService.getPredmetByRociste(this.childSelectedPredmet.id).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name +' ' + error.message);
      };
    }  

  public openDialog(flag: number, id?: number, datumRocista?: Date, sudnica?: string, ucesnik?: Ucesnik, predmet?: Predmet) {
    const dialog = this.dialog.open(RocisteDialogComponent, {data: {id, datumRocista, sudnica, ucesnik, predmet}});
    dialog.componentInstance.flag = flag;
    dialog.componentInstance.data.predmet = this.childSelectedPredmet;
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