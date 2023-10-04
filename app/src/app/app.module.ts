import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { PatientComponent } from './patient/patient.component';
import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PatientNewComponent } from './patient-new/patient-new.component';
import { TreatmentChildComponent } from './treatment-child/treatment-child.component';

 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientComponent,
    HomeComponent,
    PatientDataComponent,
    PatientNewComponent,
    TreatmentChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1800,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule
   // MatRadioModule,
    // MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
