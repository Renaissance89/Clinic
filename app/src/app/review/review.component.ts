import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  review=[]
  id:any;
  src="";
  h2=""
  data=[]
   name = this.activatedRoute.snapshot.queryParams['name']
   pid =this.activatedRoute.snapshot.queryParams['id']
  selectedFile=null;
  setName:number;

  constructor(private adminservice:AdminService,
    private router:Router,
          private activatedRoute : ActivatedRoute,
          private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.loadReview()
    if(this.name != undefined){
      this.loadReview()
    
    }
    else{
      this.check()

    }


  }
  check(){
    //this.getPatientData();
    const n=this.activatedRoute.snapshot.queryParams['tag']
    this.h2=n
    this.adminservice.getId(this.pid)
      .subscribe(response=>{
        const data=response['data']
      })

      if(n=="After Treatment Video"){
        this.setName=1
      //  this.onUploadAfter();
      }else{
        this.setName = 0
       // this.onUploadBefore();
    }
      
  }

  onSelect(event){
    if(event.target.value){
      this.selectedFile = <File>event.target.files[0]
     // this.choosen=true
    }


   }

   getPatientData(){
    this.adminservice.getData()
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data = response['data']
        // this.review=this.data
        console.log(this.data[0])
      }
    })

   }

  onUploadBefore(){
    console.log()
    let fd = new FormData()
    fd.append('rBefore',this.selectedFile)
   // const id = this.activatedRoute.snapshot.queryParams['patientId']
    this.adminservice
    .uploadBeforeVideo(this.pid,fd)
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.toastr.success("video uploaded")
        this.router.navigate(["/patient-data"])
      }
    })
   }
   onUploadAfter(){
    console.log(this.selectedFile)
    let fd = new FormData()
    fd.append('after',this.selectedFile)
    this.adminservice
    .uploadAfterVideo(this.pid,fd)
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.toastr.success("video uploaded")
        this.router.navigate(["/patient-data"])
      }
    })
   }
  loadReview(){
    console.log(this.name)
    this.adminservice
      .getReview(this.name).subscribe(response=>{
        this.review=response['data']
        if(this.name == this.review[0]['rBefore'] ){
          this.id=this.review[0]['rBefore']
          this.src="http://localhost:3000/review/videos/"+this.id;
          this.h2="Before Treatment"
        }else{
          this.id=this.review[0]['after']
          this.src="http://localhost:3000/review/videos/"+this.id;
          this.h2="After Treatment"          
        }

        // this.id1=this.review[0]['rBefore']
        // this.src1=this.src1+this.id1
        console.log(this.src)
      })
  }

}
