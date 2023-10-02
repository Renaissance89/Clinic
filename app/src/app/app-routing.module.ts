import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { HomeComponent } from './home/home.component';
import { PatientDataComponent } from './patient-data/patient-data.component';

const routes: Routes = [
  // { path: '**', redirectTo: '/home', pathMatch: 'full' },

  // {path:'',redirectTo:'/patient', pathMatch: 'full' },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'patient', component: PatientComponent},
  { path: 'patient-data', component: PatientDataComponent },  
  // { path: '', redirectTo: '/Home', pathMatch: 'full' ,component: HomeComponent},
  // { path: 'home', component: HomeComponent,
  //   children: [
  // { path: 'patient', component: PatientComponent},
  // { path: 'patient-data', component: PatientDataComponent },  
  //   ] 
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
