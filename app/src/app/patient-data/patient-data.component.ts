import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {
  data:any= [];
  filter:any= [];
  Name="";
  searchText:string;
  p: number = 1;

  menu = [
    {name: 'daily'},
    {name: 'weekly_2times'},
    {name: 'weekly'},
    {name: 'monthly'},
  ];

  constructor(private router:Router,
    private adminService:AdminService) { }

  ngOnInit(): void {
      this.loadData()

   }

   filterEvent(event){
    const n= event.target.value
    console.log(n)
    if(n == 0){
      this.data=this.filter
    }else
    {
      this.data=this.filter.filter(function(e){
        // console.log(e.menu.name)
         return  e.Treatment_Plan == n
       })

    }

    console.log(this.data)


   }

    loadTreatment_Plan() {
  
   }

   loadData(){
    this.adminService.getData()
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data = response['data']
        this.filter=this.data
      }
    })
   }
  


  findName(){
    console.log(this.Name)
   // const id = this.activatedroute.snapshot.queryParams['id']
    this.adminService.getName(this.Name)
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data = response['data']
        console.log(this.data['date'])

      }
    })
  }

}


