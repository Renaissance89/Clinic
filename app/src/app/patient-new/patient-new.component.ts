import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-patient-new',
  templateUrl: './patient-new.component.html',
  styleUrls: ['./patient-new.component.css']
})
export class PatientNewComponent implements OnInit {

  // profileForm = new FormGroup({
  //   Name: new FormControl('Name'),
  //   lastName: new FormControl(''),
  // });
  // profileForm = this.fb.group({
  //   Name: ['', Validators.required],
  //   Age: ['', Validators.required],
  //   pNumber: ['', Validators.required],
  //   Address: this.fb.group({
  //     Address: [''],
  //     Address2: [''],
  //     City: ['',Validators.required],
  //   }),
  // });

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private  toastr:ToastrService,
    private adminService:AdminService,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // this.adminService.signup(Name)
    // // .signup(Name,this.fb.group.name,this.fb.group.,this.Disease,this.Treatment,
    // //   this.Treatment_Plan,this.day,this.day1,this.time,this.time1,this.date,this.session,this.review)
    //   .subscribe(response=>{
    //     if(response['status']=="success"){
    //       this.toastr.success("patient added","",{progressBar:true})
    //     }
    //     // window.location.reload()
    //     this.ngOnInit()
    //   })
    // console.warn(this.profileForm.value);
  }

}
