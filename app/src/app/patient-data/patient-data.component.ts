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
  Name="";
  searchText:string;
  p: number = 1;

  constructor(private router:Router,
    private adminService:AdminService) { }

  ngOnInit(): void {
  //   this.adminService.getData()
  //     .subscribe(response=>{
  //       if(response['status'] == 'success'){
  //         this.data = response['data']
  //         console.log(this.data)
  //       }
  //     })
  //   // this.adminService.getData()
  //   //   .subscribe(Response=>{
  //   //     this.data = Response
  //   //     console.log(this.data)
  //   //   })
      this.adminService.getData()
      .subscribe(response=>{
        if(response['status'] == 'success'){
          this.data = response['data']
        //   this.data.sort(function (a:string, b:string) {
        //     return new Date(a.date) - new Date(b.date);
        // });
     
        // console.log(JSON.stringify(Arr)); 
        }
      })
    //   geeks_outer() {
    //     this.data.sort(this.GFG_sortFunction);
    //     console.log(JSON.stringify(this.data));
    // }
     
    //  GFG_sortFunction(a, b) {
    //     let dateA = new Date(a.date).getTime();
    //     let dateB = new Date(b.date).getTime();
    //     return dateA < dateB ? 1 : -1;
    // };
    // //  this.geeks_outer();


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
