import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ucesnik } from 'src/app/models/ucesnik';
import { UcesnikService } from 'src/app/services/ucesnik.service';

@Component({
  selector: 'app-ucesnik-dialog',
  templateUrl: './ucesnik-dialog.component.html',
  styleUrls: ['./ucesnik-dialog.component.css']
})
export class UcesnikDialogComponent {
  flag!: number;

  constructor (
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Ucesnik>,
    @Inject (MAT_DIALOG_DATA) public data: Ucesnik,
    public service: UcesnikService
  ) {}

  public add() {
    this.service.addUcesnik(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno dodat učesnik sa imenom: ${this.data.ime}`, 'U redu', {duration: 3500});
      }
    ),
    (error: Error) => {console.log(error.name + ' ' + error.message)};
    this.snackBar.open("Neuspešno dodavanje", "Zatvori", {duration: 3500});
  }

  public update() {
    this.service.updateUcesnik(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Uspešno ažuriran učesnik sa imenom: ${this.data.id}`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {console.log(error.name + ' ' + error.message)};
    this.snackBar.open("Neuspešno ažuriranje", "U redu", {duration: 3500});
  }
  
  public delete() {
    this.service.deleteUcesnik(this.data).subscribe(
      (data) => {
        this.snackBar.open("Učesnik je uspešno obrisan", "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {console.log(error.name + ' ' + error.message)};
    this.snackBar.open("Neuspepno brisanje", "Zatvori", {duration: 3500});
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od izmena", "Zatvori", {duration: 3500});
  }
}
