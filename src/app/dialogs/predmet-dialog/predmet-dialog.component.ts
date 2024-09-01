import { Predmet } from './../../models/predmet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sud } from 'src/app/models/sud';
import { PredmetService } from 'src/app/services/predmet.service';
import { SudService } from 'src/app/services/sud.service';

@Component({
  selector: 'app-predmet-dialog',
  templateUrl: './predmet-dialog.component.html',
  styleUrls: ['./predmet-dialog.component.css']
})
export class PredmetDialogComponent {
  flag!: number;
  sudovi!: Sud[];

  constructor (
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Predmet>,
    @Inject (MAT_DIALOG_DATA) public data: Predmet,
    public service: PredmetService,
    public sudService: SudService
  ) {}

  ngOnInit(): void {
    this.sudService.getAllSuds().subscribe(
      (data) => {
        this.sudovi = data;
      },
    )
  }

  public compare(a:any, b:any) {
    return a.id == b.id;
  }

  public add() {
    this.service.addPredmet(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspesno dodat predmet sa ID: ${data.id}`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspesno dodavanje", "Zatvori", {duration: 3500});
    }
  }

  public update() {
    this.service.updatePredmet(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspesno je azurirana stavka sa ID: ${data.id}`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspesno azuriranje", "Zatvori", {duration: 3500});
    }
  }

  public delete() {
    this.service.deletePredmet(this.data.id).subscribe(
      (data) => {
        this.snackBar.open("Uspesno izvrseno brisanje predmeta", "U redu", {duration: 3500});
      }
    ),
    (error: Error) =>
      console.log(error.name + ' ' + error.message);
    this.snackBar.open("Neuspesno brisanje", "Zatvori", {duration: 3500});
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od izmena", "Zatvori", {duration:3500});
  }
}
