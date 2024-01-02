import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { HomeComponent } from './home/home.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { PatientNewComponent } from './patient-new/patient-new.component';
import { TreatmentChildComponent } from './treatment-child/treatment-child.component';
import { ReviewComponent } from './review/review.component';
import { AdminService } from './admin.service';

const routes: Routes = [
  // { path: '**', redirectTo: '/home', pathMatch: 'full' },

  // {path:'',redirectTo:'/patient', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
 // { path: 'login', component: LoginComponent,canActivate: [AdminService]  },
  {
    path: 'patient', component: PatientComponent,
    children: [{ path: 'tChild', component: TreatmentChildComponent }],canActivate: [AdminService] 
  },
  { path: 'patient-data', component: PatientDataComponent,canActivate: [AdminService]  },
  { path: 'patientNew', component: PatientNewComponent,canActivate: [AdminService]  },
  { path: 'review', component: ReviewComponent,canActivate: [AdminService]  }
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
