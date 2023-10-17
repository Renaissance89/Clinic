import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons }
  from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';

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


  Name: string = "";
  treatmentType = ""
  Address = ""
  Age: number;
  Phone: number;
  History: string = "";
  // Disease = ""
  Treatment_Plan = "";
  isPresent = false;
  rId: any;
  prop = " ";
  model = " ";
  index: number;
  time = "";
  day = "";
  day1 = "";
  time1 = "";
  date = "";
  session = "";
  review = "";
  Points = "";
  closeResult = ""
  vName = ""
  pid = this.activatedRoute.snapshot.queryParams['id']
  user: any
  other = false
  oldD = []
  startDate: Date;
  endDate: Date;

  itemName: boolean = false;
  // Treatment: string[];
  Treatment = new Array<string>();
  Disease = new Array<any>();

  menu = [
    { name: 'Daily' },
    { name: 'Weekly(2 Times)' },
    { name: 'Weekly' },
    { name: 'Monthly' },
  ];
  days = [
    { name: 'sunday' },
    { name: 'monday' },
    { name: 'tuesday' },
    { name: 'wednesday' },
    { name: 'thursday' },
    { name: 'friday' },
    { name: 'saturday' },
  ];

  // treatmentPlan=[]
  arr = new Array<string>();

  treatmentPlan = [
    { name: 'methi',a:false },
    { name: 'magnet',a:false },
    { name: 'talya',a:false },
    { name: 'tup',a:false },
    { name: 'remove toxins',a:false },
  ]

  Disease1 = [
    { 0: '' },
    { 1: 'Deep Un consciousness - GV19 BY' },
    { 2: 'Headache - G41 BW' },
    { 3: 'Neck pain - TW13 BW, P7FW, LI 10 BW, TW12 BW' },
    { 4: 'Shoulder pain - B5 FW, TW3BW, LI7BW' },
    { 5: 'Parkinson - 87FW' },
    { 6: 'Paralysis of one side of body - LIVGFY  ' },
    { 7: 'Elbow Pain - LV6FW, TW5 BW ' },
    { 8: 'Hand & Finger Pain - 517 BW L LI 13 BW, silo B10 LU6FW ' },
    { 9: 'Back pain (upper & mid) GV10 810, B11 BW, B13 BY GV1BW ' },
    { 10: 'Lower Back Pain K3FY, B30 BW, GV26FW, B64 BY GVI BW ' },
    { 11: 'Buttocks Problem/pain 851 (masaj) ' },
    { 12: 'HIP Joint Pain CV6 FY' },
    { 13: 'sciatica pain G33BY, G30BW' },
    { 14: 'knee pain ST45 BW, LIVE 7FW' },
    { 15: 'Feet (Pain/heaviness/Numbness) - B61 BY' },
    { 16: 'Pain in calf ST-4S BW, B57BW, G39BW, G32By' },
    { 17: 'Pain in foot ST-4S BW, 8593W, G37 BW, G42 BW, ST31 BW ST42BAY ' },
    { 18: 'General Cramps = LIV 3 FW ' },
    { 19: 'Ankle pain G37 BW' },
    { 20: 'Heal Pain ST43 BW' },
    { 21: 'Hot soles B 67 BW ' },
    { 22: 'Sensation of small insects creeping all over the body ST32 BY ' },
    { 23: 'Internal Inflamnation (anywhere in body)SP6 FW' },
    { 24: 'Anal Fissure CV1ZFW, CV6FY, K7FY, G38 BW ' },
    { 25: 'Anal Fistula = SPS FW ' },
    // { 26: ' ' },
    // { 27: ' ' },
    // { 28: ' ' },
  ]
  // Disease1 = [
  //   { name: '' },
  //   { name: 'other' },
  //   { name: 'BackPain' },
  //   { name: 'daviGoti' },
  //   { name: 'ujavioti' },
  //   { name: 'remove toxins' },
  // ]

  valu: boolean = false
  //   menu = [
  //  'Daily',
  //  'Weekly(2 Times)',
  //  'Weekly',
  //    'Monthly',
  //   ];

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
  constructor(
    // srcImage = "image.jpg",
    // srcImageZoom = "image-zoom.jpg",
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private http: HttpClient,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,

  ) { }

  now = new Date();
  no = 1;

  ngOnInit(): void {


    // this.adminService.getTreatment()
    // .subscribe(response=>{
    //   if(response['status'] == 'success'){
    //     this.treatmentPlan=response['data']
    //     console.log(this.Treatment)
    //   }
    // })

    if (this.pid > 0) {
      this.vName = "update"
      this.adminService.getId(this.pid)
        .subscribe(response => {
          if (response['status'] == 'success') {
            const users = response['data']
            if (users) {
              this.user = users[0]
              this.Treatment = Array.from(
                this.user['Treatment'].split(",")
              )

              // this.treatmentPlan.forEach((i)=>
              // // this.valu=i.name==this.user['Treatment'].split(",")
              //   this.Treatment.forEach((j)=>{
              //     this.valu=i.name == j
              //   })          
              // )

              // console.log(this.Treatment)
              // this.userList = this.user['firstName']
              // if(JSON.stringify(arr) == JSON.stringify(this.Treatment)){
              //   this.valu=true
              // }else{
              //   this.valu=false
              // }
              this.Name = this.user['Name']
              this.Address = this.user['Address']
              this.Age = this.user['Age']
              this.Disease = this.user['Disease']
              this.Treatment = this.user['Treatment']
              this.Treatment_Plan = this.user['Treatment_Plan']
              this.day = this.user['Day']
              this.day1 = this.user['Day1']
              this.time = this.user['Time']
              this.time1 = this.user['Time1']
              this.date = this.user['Date']
              this.session = this.user['session']
              this.review = this.user['review']
              this.History = this.user['History']
              this.Points = this.user['Points']
              this.Phone = this.user['Phone']
              this.startDate = this.user['startDate']
              this.endDate = this.user['endDate']
            }

           this.treatmentPlan.forEach(f=> this.Treatment.includes(f.name)?f.a=true:f.a=false)
          //  this.Treatment.forEach(element=>
          //   // this.treatmentPlan=this.treatmentPlan.filter((item)=>{
          //   //   item.a == true;
          //   //   return item.name = element
          //   // })
          //   this.treatmentPlan.forEach(i => element == i.name ?i.a = true:i.a=false)
          //   )
            this.Treatment = []
            this.oldD = this.Disease
          }
        })
      //   this.Treatment=Array.from(
      //     this.user['Treatment'].split(",")
      // )


      this.treatmentPlan.forEach((i) =>
        // this.valu=i.name==this.user['Treatment'].split(",")
        this.valu = this.Treatment.includes(i.name)
        // this.Treatment.forEach((j)=>{
        //   this.valu=this.treatmentPlan.includes(j)
        // })          
      )

    }
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
  onSignup() {
    if (this.pid > 0) {
      // if (this.Name.length == 0) {
      //   this.toastr.error("name is mandatory")
      // } else if (this.Address.length <= 12) {
      //   this.toastr.error("address is mandatory")
      // } else if (this.Disease.length == 0) {
      //   this.toastr.error("operation is mandatory")
      // } else if (this.Treatment.length == 0) {
      //   this.toastr.error("Treatment is mandatory")
      // }
      // //  else if (this.Treatment_Plan.length == 0) {
      // //   this.toastr.error("Treatment_Plan is mandatory")
      // // }
      //  else if (this.Treatment_Plan == "daily" && this.time.length == 0) {
      //   this.toastr.error("time is mandatory")
      // } else if (this.Treatment_Plan == "weekly" && this.day.length == 0) {
      //   this.toastr.error("day is mandatory")
      // } else if (this.Treatment_Plan == "weekly_2times" && this.day.length == 0 && this.day1.length == 0) {
      //   this.toastr.error("day1 and day is mandatory")
      // } else if (this.Treatment_Plan == "weekly_2times" && this.time.length == 0 && this.time1.length == 0) {
      //   this.toastr.error("time and time1 is mandatory")
      // } else if (this.Treatment_Plan == "monthly" && this.date.length == 0) {
      //   this.toastr.error("date is mandatory")
      // } else if (this.Treatment["name"] == "methi" && this.Points.length == 0) {
      //   this.toastr.error("points are mandatory")
      // } else if (this.History.length == 0) {
      //   this.toastr.error("History is mandatory")
      // } else if (this.startDate== null) {
      //   this.toastr.error("start Date is mandatory")
      // } else if (this.endDate == null) {
      //   this.toastr.error("end Date is mandatory")
      // }
      if (this.Name.length == 0) {
        this.toastr.error("name is mandatory")
      } else if (this.Address.length <= 12) {
        this.toastr.error("address is mandatory")
      } else if (this.Disease.length == 0) {
        this.toastr.error("operation is mandatory")
      } else if (this.Treatment.length == 0) {
        this.toastr.error("Treatment is mandatory")
      } else if (this.Treatment_Plan.length == 0) {
        this.toastr.error("Treatment_Plan is mandatory")
      } else if (this.Treatment_Plan == "daily" && this.time.length == 0) {
        this.toastr.error("time is mandatory")
      } else if (this.Treatment_Plan == "weekly" && this.day.length == 0) {
        this.toastr.error("day is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.day1.length == 0) {
        this.toastr.error("day1 is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.time.length == 0) {
        this.toastr.error("time is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.time1.length == 0) {
        this.toastr.error(" time1 is mandatory")
      } else if (this.Treatment_Plan == "monthly" && this.date.length == 0) {
        this.toastr.error("date is mandatory")
      } else if (this.Treatment["name"] == "methi" && this.Points.length == 0) {
        this.toastr.error("points are mandatory")
      } else if (this.startDate == null) {
        this.toastr.error("start Date is mandatory")
      } else if (this.endDate == null) {
        this.toastr.error("end Date is mandatory")
      } else if (this.History.length == 0) {
        this.toastr.error("History is mandatory")
      }
      else {
        if (this.Treatment_Plan == "daily") {
          this.day = "";
          this.time1 = "";
          this.day1 = "";
          this.date = "";
        }
        if (this.Treatment_Plan == "monthly") {
          // this.day="";
          this.time1 = "";
          this.day1 = "";
        }
        if (this.Treatment.includes("talya") || this.Treatment.includes("tup") || this.Treatment.includes('remove toxins')) {
          if ((this.Treatment.includes("methi") || this.Treatment.includes("magnet"))) {

          } else {
            this.Points = ""
          }

        }
        this.adminService
          .updatePatient(this.pid, this.Name, this.Address, this.Age, this.Disease, this.Treatment,
            this.Treatment_Plan, this.day, this.day1, this.time, this.time1, this.date,
            this.session, this.review, this.History, this.Points, this.Phone, this.startDate, this.endDate)
          .subscribe(response => {
            if (response['status'] == "success") {
              this.toastr.success("patient updated", "", { progressBar: true })
            }
          })
        // setTimeout(() => {
        //   window.location.reload()
        // }, 3000);
        this.router.navigate(['/patient-data'])
      }

    }
    else {
      if (this.Name.length == 0) {
        this.toastr.error("name is mandatory")
      } else if (this.Address.length <= 12) {
        this.toastr.error("address is mandatory")
      } else if (this.Disease.length == 0) {
        this.toastr.error("operation is mandatory")
      } else if (this.Treatment.length == 0) {
        this.toastr.error("Treatment is mandatory")
      } else if (this.Treatment_Plan.length == 0) {
        this.toastr.error("Treatment_Plan is mandatory")
      } else if (this.Treatment_Plan == "daily" && this.time.length == 0) {
        this.toastr.error("time is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.day.length == 0) {
        this.toastr.error(" day is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.day1.length == 0) {
        this.toastr.error("day1 is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.time.length == 0) {
        this.toastr.error("time is mandatory")
      } else if (this.Treatment_Plan == "weekly_2times" && this.time1.length == 0) {
        this.toastr.error(" time1 is mandatory")
      } else if (this.Treatment_Plan == "monthly" && this.date.length == 0) {
        this.toastr.error("date is mandatory")
      } else if (this.Treatment["name"] == "methi" && this.Points.length == 0) {
        this.toastr.error("points are mandatory")
      } else if (this.startDate == null) {
        this.toastr.error("start Date is mandatory")
      } else if (this.endDate == null) {
        this.toastr.error("end Date is mandatory")
      } else if (this.History.length == 0) {
        this.toastr.error("History is mandatory")
      }
      else {
        this.adminService
          .signup(this.Name, this.Address, this.Age, this.Disease, this.Treatment,
            this.Treatment_Plan, this.day, this.day1, this.time, this.time1, this.date,
            this.session, this.review, this.History, this.Points, this.Phone, this.startDate, this.endDate)
          .subscribe(response => {
            if (response['status'] == "success") {
              this.toastr.success("patient added", "", { progressBar: true })
              console.log(this.Name, this.Address, this.Age, this.Disease, this.Treatment, this.Treatment_Plan,
                this.day, this.day1, this.time, this.time1, this.date, this.review, this.session)
            }
          })
        // setTimeout(() => {
        //   window.location.reload()
        // }, 3000);
        this.router.navigate(['/patient-data'])
      }
    }



  }

  addDisease(e: string) {
    // if(e && e!== 'other'){

    // }
    if (e == "other") {
      this.other = true
    } else {
      if (this.pid) {
        this.Disease = Array.from(
          this.user['Disease'].split(",")
        )
        this.Disease.push(e)

      } else {
        this.Disease.push(e)
      }

    }
    console.log(this.Disease)
  }

  addTreatment(e: any, item: string) {

    if (e.target.checked) {
      this.Treatment.push(item);
      // if(this.Treatment[0] === 'methi' || this.Treatment[0] === 'magnet' ){
      //   this.itemName=true
      // }
      this.Treatment.forEach(element => {
        if (element == 'methi') {
          this.itemName = true
        }
        if (element == 'magnet') {
          this.itemName = true
        }

      });


    } else {
      this.Treatment = this.Treatment.filter(m => m != item);
      if (this.treatmentPlan.length == 0) {
        this.itemName = false
      }
      if (this.Treatment.includes("methi") || this.Treatment.includes("magnet")) {
        this.itemName = true
      } else {
        this.itemName = false
      }
      // this.Treatment=this.treatmentPlan
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
  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}

