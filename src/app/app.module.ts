import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PredmetComponent } from './main/predmet/predmet.component';
import { UcesnikComponent } from './main/ucesnik/ucesnik.component';
import { RocisteComponent } from './main/rociste/rociste.component';
import { SudComponent } from './main/sud/sud.component';
import { AboutComponent } from './utility/about/about.component';
import { HomeComponent } from './utility/home/home.component';
import { AuthorComponent } from './utility/author/author.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { PredmetDialogComponent } from './dialogs/predmet-dialog/predmet-dialog.component';
import { RocisteDialogComponent } from './dialogs/rociste-dialog/rociste-dialog.component';
import { SudDialogComponent } from './dialogs/sud-dialog/sud-dialog.component';
import { UcesnikDialogComponent } from './dialogs/ucesnik-dialog/ucesnik-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    SudComponent,
    PredmetComponent,
    UcesnikComponent,
    RocisteComponent,
    AboutComponent,
    HomeComponent,
    AuthorComponent,
    PredmetDialogComponent,
    RocisteDialogComponent,
    SudDialogComponent,
    UcesnikDialogComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
