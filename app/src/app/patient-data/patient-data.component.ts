import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  selectedFile = null;
  bName=""
  src="http://localhost:3000/patient/image/"
  name=""
  id:any

  menu = [
    {name: 'daily'},
    {name: 'weekly_2times'},
    {name: 'weekly'},
    {name: 'monthly'},
  ];

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private adminservice:AdminService,
    private activatedroute: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
      this.loadData()
   }
   
   onSelect(event){
    this.selectedFile = event.target.files[0]
   }

   onUploadBefore(id,event){
    // const id = this.activatedRoute.snapshot.queryParams['patientId']
    // this.adminservice
    // .uploadBeforeVideo(id,this.selectedFile)
    // .subscribe(response=>{
    //   if(response['status'] == 'success'){
    //     this.toastr.success("image uploaded")
    //     this.router.navigate(["/patient-data"])
    //   }
    // })
  //  console.log(event.target.value)
  const tag="Before Treatment Video"
    this.router.navigate(['/review'],{queryParams: {id:id,tag:tag} }  )
   }

   onUploadAfter(id){
    // const id = this.activatedRoute.snapshot.queryParams['patientId']
    // this.adminservice
    // .uploadAfterVideo(id,this.selectedFile)
    // .subscribe(response=>{
    //   if(response['status'] == 'success'){
    //     this.toastr.success("image uploaded")
    //     this.router.navigate(["/patient-data"])
    //   }
    // })
    const tag="After Treatment Video"
    this.router.navigate(['/review'],{queryParams: {id:id,tag:tag} }  )
   }
   uploadImage(id){
    const tag="image"
    this.router.navigate(['/review'],{queryParams: {id:id,tag:tag} }  )
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

   onClick(name,event){
    console.log(event)
    this.router.navigate(['/review'],{queryParams: {name:name} }  )
   }

  //   loadTreatment_Plan() {
  
  //  }
  onChange(event){
    console.log("onchange",event)
  }

   loadData(){
    this.adminservice.getData()
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data = response['data']
        this.filter=this.data
        // if(this.name != this.data[0]['image'] ){
        //   this.id=this.data[0]['image']
        //   this.src="http://localhost:3000/patient/image/"+this.id;
        // }
        // this.filter.forEach(element => {
        //   if(element.image != "")
        //   this.src=element.image          
        // });
       // console.log(this.data[0])
      }
    })
   }
  


  findName(){
    console.log(this.Name)
   // const id = this.activatedroute.snapshot.queryParams['id']
    this.adminservice.getName(this.Name)
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data = response['data']
        console.log(this.data['date'])

      }
    })
  }

  deleteReviewBefore(id){    
    this.adminservice
    .deleteReview(id,'rBefore')
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data=response['data']
        this.loadData()
      }
    })
  }
  deleteReviewAfter(id){
    this.adminservice
    .deleteReview(id,'After')
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.data=response['data']
        this.loadData()
      }
    })
  }

  deletePatient(id){
    this.adminservice
    .deletePatient(id)
    .subscribe(response=>{
      if(response['status'] == 'success'){
        this.loadData()
      }
    })

  }

  updatePatient(id){
    this.router.navigate(['/patient'],{queryParams: {id:id} })
  }

}


