import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sud } from 'src/app/models/sud';
import { SudService } from 'src/app/services/sud.service';

@Component({
  selector: 'app-sud-dialog',
  templateUrl: './sud-dialog.component.html',
  styleUrls: ['./sud-dialog.component.css']
})
export class SudDialogComponent {
  flag!:number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Sud>,
    @Inject (MAT_DIALOG_DATA) public data: Sud,
    public service: SudService
  ) {}

  public add() {
    this.service.addSud(this.data).subscribe(
      (data) => {
        this.snackBar.open("Uspešno dodavanje!", "Zatvori", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspešno dodavanje!", "Zatvori", {duration: 3500});
    }
  }

  public update() {
    this.service.updateSud(this.data).subscribe(
      (data) => {
        this.snackBar.open(`Sud sa id ${data.id} je uspešno ažuriran`, "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspešno azuriranje!", "Zatvori", {duration: 3500});
    }
  }

  public delete() {
    this.service.deleteSud(this.data).subscribe(
      (data) => {
        this.snackBar.open("Sud je uspešno obrisan", "U redu", {duration: 3500});
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open("Neuspešno brisanje!", "Zatvori", {duration: 3500});
    }
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od izmene!", "Zatvori", {duration: 3500});
  }
}
