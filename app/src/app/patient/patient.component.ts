import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // @ViewChild('patientForm',null)pForm:NgForm;

  // contact:contact;

  // this.contact={
  //   Name: "";
  //   Address : ""
  //   Age:number;
  //   Phone:number;
  //   History:string;
  //   Disease : ""
  //   Treatment_Plan:"";
  //   isPresent:false;
  //   rId:any;
  //   prop : " " ;
  //   model : " " ;
  //   index:number;
  //   time :"";
  //   day:"";
  //   day1:"";
  //   time1:"";
  //   date:"";
  //   session:"";
  //   review:"";
  //   Points:string;
  // }
  

  Name:string ="";
  treatmentType=""
  Address = ""
  Age:number;
  Phone:number;
  History:string ="";
  Disease = ""
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
  Points:string="";


  itemName:boolean=false;
  Treatment:string[];

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
   no=1;

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
    // this.index=i;

 }
  onSignup(){
    if(this.Name.length == 0){
      this.toastr.error("name is mandatory")
    }else if(this.Address.length <= 12){
      this.toastr.error("address is mandatory")
    }else if(this.Disease.length == 0){
      this.toastr.error("operation is mandatory")
    }else if(this.Treatment.length == 0){
      this.toastr.error("Treatment is mandatory")
    }else if(this.Treatment_Plan.length == 0){
      this.toastr.error("Treatment_Plan is mandatory")
    }else if(this.Treatment_Plan == "daily" && this.time.length == 0){
      this.toastr.error("time is mandatory")
    }else if(this.Treatment_Plan == "weekly" &&this.day.length == 0){
      this.toastr.error("day1 is mandatory")
    }else if(this.Treatment_Plan == "weekly_2times" &&this.day.length == 0 && this.day1.length == 0){
      this.toastr.error("day1 and day is mandatory")
    }else if(this.Treatment_Plan == "weekly_2times" &&this.time.length == 0 && this.time1.length == 0){
      this.toastr.error("time and time1 is mandatory")
    }else if(this.Treatment_Plan == "monthly" && this.date.length == 0){
      this.toastr.error("date is mandatory")
    }else if(this.Treatment["name"] == "methi"  &&this.Points.length == 0){
      this.toastr.error("points are mandatory")
    }else if(this.History.length == 0){
      this.toastr.error("History is mandatory")
    }    
    else{
      this.adminService
      .signup(this.Name,this.Address,this.Age,this.Disease,this.Treatment,
        this.Treatment_Plan,this.day,this.day1,this.time,this.time1,this.date,
        this.session,this.review,this.History,this.Points,this.Phone)
        .subscribe(response=>{
          if(response['status']=="success"){
            this.toastr.success("patient added","",{progressBar:true})
            console.log(this.Name,this.Address,this.Age,this.Disease,"treatment"+this.Treatment,this.Treatment_Plan,
            this.day,this.day1,this.time,this.time1,this.date,this.review,this.session)
          }
        })
        setTimeout(() => {
           window.location.reload()
        }, 3000);
    }


  }

  addTreatment(e:any,item:string){
    if(e.target.checked){
      this.Treatment.push(item);
      // if(this.Treatment[0] === 'methi' || this.Treatment[0] === 'magnet' ){
      //   this.itemName=true
      // }
      this.Treatment.forEach(element => {
        if(element == 'methi' ){
          this.itemName=true
        }
        if(element == 'magnet' ){
          this.itemName=true
        }
        
      });
      

    }else{
      this.Treatment= this.Treatment.filter(m=>m!=item);
      if(this.Treatment.length == 0){
        this.itemName = false
      }
      if(this.Treatment.includes("methi") || this.Treatment.includes("magnet")){
        this.itemName=true
      }else{
        this.itemName=false
      }
      // this.Treatment.forEach(element => {
      //   if(element !== 'methi' ){
      //     this.itemName=false
      //   }
      //   if(element !== 'magnet' ){
      //     this.itemName=false
      //   }
        
      // });
    }

  }
}

