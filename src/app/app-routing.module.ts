import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './utility/home/home.component';
import { AboutComponent } from './utility/about/about.component';
import { AuthorComponent } from './utility/author/author.component';
import { PredmetComponent } from './main/predmet/predmet.component';
import { RocisteComponent } from './main/rociste/rociste.component';
import { SudComponent } from './main/sud/sud.component';
import { UcesnikComponent } from './main/ucesnik/ucesnik.component';

const routes: Routes = [
{path: 'predmet', component: PredmetComponent},
{path: 'rociste', component: RocisteComponent},
{path: 'sud', component: SudComponent},
{path: 'ucesnik', component: UcesnikComponent},
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'author', component: AuthorComponent},
{path: '', component: HomeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }