import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  Name:string ="";
  Address = ""
  Age = ""
  Disease = ""
  Treatment:string[];
  Treatment_Plan="";
  isPresent=false;
  rId:any;
  prop = " " ;
  model = " " ;
  index:number;
  time ="";
  day="";
  day1="";
  time1="";
  date="";
  session="";
  review="";

  menu = [
    {name: 'Daily'},
    {name: 'Weekly(2 Times)'},
    {name: 'Weekly'},
    {name: 'Monthly'},
  ];
  days = [
    {name: 'sunday'},
    {name: 'monday'},
    {name: 'tuesday'},
    {name: 'wednesday'},
    {name: 'thursday'},
    {name: 'friday'},
    {name: 'saturday'},
  ];
  treatmentPlan=[
    {name:'methi'},
    {name:'magnet'},
    {name:'talya'},
    {name:'tup'},
    {name:'remove toxins'},
  ]
//   menu = [
//  'Daily',
//  'Weekly(2 Times)',
//  'Weekly',
//    'Monthly',
//   ];

  timeSlot =[
    {name: '9:30'},
    {name: '10:30'},
    {name: '11:30'},
    {name: '12:30'},
    {name: '1:30'},
    {name: '3:30'},
    {name: '4:30'},
    {name: '5:30'},
    // "9:30","10:30","11:30","12:30","1:30","3:30","4:30","5:30","6:30",
  ]
  constructor(
    private router:Router,
    private  toastr:ToastrService,
    private adminService:AdminService,
    private http:HttpClient
  ) { }
  
   now = new Date();

  ngOnInit(): void {
    this.Treatment= new Array<string>();
  }
  // selected(){
  //   this.isPresent=true;
  //   //this.rId = 1
  //   console.log(this.rId)
  // }
  //isVisible = -1; // if you want to show by default some input keep it 0 for first radio, 1 for second and so on. I have kept it -1 so no input is shown by default

  // onItemChange(item, i) {
  //    console.log(item,i);
  //    this.isVisible = i;
  //    this.index=i;
  // }
  onItemChange() {
    // console.log(item,i);
    console.log(typeof(this.date))
    // this.index=i;

 }
  onSignup(){
    if(this.Name.length == 0){
      this.toastr.error("name is mandatory","",{progressAnimation:'decreasing'})
    }else{
      this.adminService
      .signup(this.Name,this.Address,this.Age,this.Disease,this.Treatment,
        this.Treatment_Plan,this.day,this.day1,this.time,this.time1,this.date,this.session,this.review)
        .subscribe(response=>{
          if(response['status']=="success"){
            this.toastr.success("patient added","",{progressBar:true})
          }
          // window.location.reload()
          this.ngOnInit()
        })
    }

      // console.log(this.Name,this.Address,this.Age,this.Disease,this.Treatment,this.Treatment_Plan,
      //   this.day,this.day1,this.time,this.time1,this.date,this.review,this.session)
  }

  addTreatment(e:any,item:string){
    if(e.target.checked){
      console.log(item+'checked');
      this.Treatment.push(item);
    }else{
      console.log(item+'unchecked')
      this.Treatment= this.Treatment.filter(m=>m!=item);
    }
    JSON.stringify(this.Treatment);
    console.log(typeof(this.Treatment))
  }
}
