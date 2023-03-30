import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { FinishComponent } from './finish/finish.component';
import { LegalComponent } from './legal/legal.component';
import { ComprobarComponent } from './comprobar/comprobar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formulario', component: FormComponent },
  { path: 'finalizar', component: FinishComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'comprobar', component: ComprobarComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
