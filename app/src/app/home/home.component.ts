import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  count:any;
  no:number;

  constructor(private router:Router,
    private adminService:AdminService) { }
  ngOnInit(): void {
    // this.adminService.getCount()
    //   .subscribe(response=>{
    //     if(response['status'] == 'success'){
    //       this.count=response['data'][0]['count']
    //     }
    //   })
    this.adminService.getCount()
      .subscribe(response=>{
        console.log(response['data'])
        this.count=response['data']['count']
        localStorage['token']=response['data']['token']
        // console.log(response['data']['count'])
      })
  }

}
