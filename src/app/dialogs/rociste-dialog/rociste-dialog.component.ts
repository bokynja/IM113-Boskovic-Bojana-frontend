import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RocisteService } from './../../services/rociste.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Rociste } from 'src/app/models/rociste';
import { Ucesnik } from 'src/app/models/ucesnik';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { Predmet } from 'src/app/models/predmet';
import { PredmetService } from 'src/app/services/predmet.service';

@Component({
  selector: 'app-rociste-dialog',
  templateUrl: './rociste-dialog.component.html',
  styleUrls: ['./rociste-dialog.component.css']
})
export class RocisteDialogComponent implements OnInit {
  flag!: number;
  ucesnici!: Ucesnik[];
  predmeti!: Predmet[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Rociste>,
    @Inject (MAT_DIALOG_DATA) public data: Rociste,
    public service: RocisteService,
    public ucesnikService: UcesnikService,
    public predmetService: PredmetService
  ) {}

  ngOnInit(): void {
    this.ucesnikService.getAllUcesnik().subscribe(ucesnici =>
    this.ucesnici = ucesnici);
    this.predmetService.getAllPredmets().subscribe(predmeti =>
    this.predmeti = predmeti);
  }

  public compare(a:any, b:any) {
    return (a.id == b.id);
  }

  public add() {
    this.service.addRociste(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno dodato ročište sa ID:${data.id}`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspešno dodavanje", "Zatvori", {duration: 3500});
    }
  }

  public update() {
    this.service.updateRociste(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno ažurirano ročište sa ID ${data.id}`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspešno ažuriranje", "Zatvori", {duration: 3500});
    }
  }

  public delete() {
    this.service.deleteRociste(this.data.id).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno izbrisano ročište`, "U redu",{duration: 3500});
      }
    ),
    (error: Error) =>
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspesno brisanje", "Zatvori", {duration: 3500});
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od izmena", "Zatvori", {duration: 3500});
  }
}

