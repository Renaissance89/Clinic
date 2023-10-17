import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
//import { forEach } from 'core-js/core/array';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {
  data: any = [];
  filter: any = [];
  Name = "";
  searchText: string;
  p: number = 1;
  selectedFile = null;
  bName = ""
  src = "http://localhost:3000/patient/image/"
  name = ""
  id: any
  startDate: Date = null
  endDate: Date = null
  fData: any = [];
  fPlanData: any = [];
  fTimeData: any = [];
  isDisabled:boolean=false;

  menu = [
    { name: 'daily' },
    { name: 'weekly_2times' },
    { name: 'weekly' },
    { name: 'monthly' },
  ];

  timeSlot = [
    { name: '9:30' },
    { name: '10:30' },
    { name: '11:30' },
    { name: '12:30' },
    { name: '1:30' },
    { name: '3:30' },
    { name: '4:30' },
    { name: '5:30' },
    // "9:30","10:30","11:30","12:30","1:30","3:30","4:30","5:30","6:30",
  ]

  days = [
    { name: 'sunday' },
    { name: 'monday' },
    { name: 'tuesday' },
    { name: 'wednesday' },
    { name: 'thursday' },
    { name: 'friday' },
    { name: 'saturday' },
  ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminservice: AdminService,
    private activatedroute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  onSelect(event) {
    this.selectedFile = event.target.files[0]
  }

  onUploadBefore(id, event) {
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
    const tag = "Before Treatment Video"
    this.router.navigate(['/review'], { queryParams: { id: id, tag: tag } })
  }

  onUploadAfter(id) {
    // const id = this.activatedRoute.snapshot.queryParams['patientId']
    // this.adminservice
    // .uploadAfterVideo(id,this.selectedFile)
    // .subscribe(response=>{
    //   if(response['status'] == 'success'){
    //     this.toastr.success("image uploaded")
    //     this.router.navigate(["/patient-data"])
    //   }
    // })
    const tag = "After Treatment Video"
    this.router.navigate(['/review'], { queryParams: { id: id, tag: tag } })
  }
  uploadImage(id) {
    const tag = "image"
    this.router.navigate(['/review'], { queryParams: { id: id, tag: tag } })
  }

  filterEvent(event) {
    const n = event.target.value

    // if(this.startDate != null){
    //   this.fData = this.data
    // }
    console.log(n)
    if (this.startDate == null) {
      if (n == 0) {
        this.data = this.filter
      } else {
        this.data = this.filter.filter(function (e) {
          // console.log(e.menu.name)
          return e.Treatment_Plan == n
        })

      }
    }
    else {
      if (n == 0) {
        this.data = this.fData
        this.fPlanData=this.fData
      } else {

        this.data = this.fData.filter(function (e) {
          // console.log(e.menu.name)
          return e.Treatment_Plan == n
        })
        this.fPlanData=this.data
        // this.data=fData

      }
    }


  }

  //  filterDate(event){
  //   console.log("event",event.target.value)
  //   this.startDate = event.target.value

  //  }

  filterTime(event) {
    const n = event.target.value

    // if(this.startDate != null){
    //   this.fData = this.data
    // }
    console.log(n)
    if (this.startDate == null) {
      if (n == 0) {
        this.data = this.filter
      } else {
        this.data = this.filter.filter(function (e) {
          // console.log(e.menu.name)
          return e.Time == n
        })

      }
    }
    else {
      if (n == 0) {
        this.data = this.fData
      } else {

        this.data = this.fPlanData.filter(function (e) {
          // console.log(e.menu.name)
          return e.Time == n
        })
        // this.data=fData

      }
    }


  }

  filterDateFinal(event) {
    this.endDate = event.target.value
    // this.data=this.filter.filter(function(e){
    //   // console.log(e.menu.name)
    //    return  e.startDate >= this.startDate && e.endDate <= this.endDate
    //  })
    console.log(typeof (this.startDate))
    if (this.startDate > this.endDate) {
      this.toastr.error("end date must be greater than start date ")
    } else {
      // const sDate= new Date(this.startDate)
      //const eDate= new Date(this.endDate)

      // let sDate=this.fData.forEach((e)=>e.startDate)
      // console.log(sDate)
      // const newDate = addWeeks(sDate, 1);

      // function addWeeks(date, weeks) {
      //   date.setDate(date.getDate() + 7 * weeks);
      //   return date;
      // }
      // console.log("newDate",newDate)
      // if(this.startDate < this.endDate){
      //   //this.fData=this.data
      //   this.data=this.fData.filter((donj) => {
      //     console.log(donj.startDate > this.startDate)
      //     donj.startDate > this.startDate

      //   })
      //     // .map((dnoj)=>{
      //     //   return dnoj
      //     // })
      //   console.log(this.data)
      // }
      this.adminservice.getDateFilter(this.startDate, this.endDate)
        .subscribe(response => {
          this.data = response['data']
          this.fData = this.data
        })
    }


  }

  onClick(name, event) {
    console.log(event)
    this.router.navigate(['/review'], { queryParams: { name: name } })
  }

  //   loadTreatment_Plan() {

  //  }
  onChange(event) {
    console.log("onchange", event)
  }

  loadData() {
    this.adminservice.getData()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.data = response['data']
          this.filter = this.data
          this.fData = this.data
         // console.log(this.data)
          // let valueArray= Object.values(this.data).filter(e=>{
          //   let value=Object.values(e)
          //   let d =value.filter(e1=>{
          //     e1.length>0
          //   })
          //   console.log(d)
          // })
          // let keyArray= Object.keys(this.data[0])
          // this.data=valueArray.filter(e=>{
          //   keyArray.forEach(k=>{

          //   })
          // })
          // console.log(keyArray)
          // console.log(valueArray)
          //         let fdata = keyArray.filter(e=>{
          //           let d=Object.values(e)
          //           return d.filter(e=>{
          // //let final= e.length>0
          //             console.log(e)
          //           })
          //         })
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



  findName() {
    console.log(this.Name)
    // const id = this.activatedroute.snapshot.queryParams['id']
    this.adminservice.getName(this.Name)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.data = response['data']
          console.log(this.data['date'])

        }
      })
  }

  deleteReviewBefore(id) {
    this.adminservice
      .deleteReview(id, 'rBefore')
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.data = response['data']
          this.loadData()
        }
      })
  }
  deleteReviewAfter(id) {
    this.adminservice
      .deleteReview(id, 'After')
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.data = response['data']
          this.loadData()
        }
      })
  }

  deletePatient(id) {
    this.adminservice
      .deletePatient(id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.loadData()
        }
      })

  }

  updatePatient(id) {
    this.router.navigate(['/patient'], { queryParams: { id: id } })
  }

}


