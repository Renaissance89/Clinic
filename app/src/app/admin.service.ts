import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost:3000/patient'

  url1 = 'http://localhost:3000/review'

  httpOptions = {
    headers: new HttpHeaders({
      token: localStorage['token']
    })
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }
  
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.httpClient.post(this.url + '/signin', body)
  }

  signup(Name: string, Address: string, Age: Number, Disease: string[], Treatment: string[],Treatment_Plan: string, day: string,
     day1: string, time: string,time1: string,date: string,session: string,review: string
     ,History: string,points: string,Phone: number,startDate:Date,endDate:Date) {
    const body = {
      Name:Name,
      Address:Address,
      Age:Age,
      Disease:Disease,
      Treatment:Treatment,
      Treatment_Plan:Treatment_Plan,
      day:day,
      day1:day1,
      time:time,
      time1:time1,
      date:date,
      session:session,
      review:review,
      History:History,
      Points:points,
      Phone:Phone,
      startDate:startDate,
      endDate:endDate,
    }

    return this.httpClient.post(this.url + "/signup", body, this.httpOptions)
  }

  signup1(Name: string,Age:Number) {
   const body = {
     Name:Name,
     Age:Age,

   }

   return this.httpClient.post(this.url + "/signup1", body,this.httpOptions)
 }

 getReview(id){
  return this.httpClient.get(this.url1+"/before/"+id,this.httpOptions)
 }

  getData() {
    return this.httpClient.get(this.url + "/patientData",this.httpOptions)
  }
  getDateFilter(startDate,endDate) {
    return this.httpClient.get(this.url + "/patientData/"+startDate+"/"+endDate,this.httpOptions)
  }
  getName(Name: string) {
    // const body ={
    //   Name:Name
    // }
    console.log(this.url + "/name")
    return this.httpClient.get(this.url + "/name"+Name,this.httpOptions)

  }

  getId(id: number) {

    console.log(this.url + "/"+id)
    return this.httpClient.get(this.url1+"/"+id,this.httpOptions)

  }

  
  
  getCount(){
    return this.httpClient.get(this.url+'/count')
  }
  getTreatment(){
    return this.httpClient.get(this.url+'/Treatment',this.httpOptions)
  }

  uploadBeforeVideo(id,file){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     token: sessionStorage['token']
    //   })
    // };

    // const body = new FormData()
    // body.append('rBefore', file)

    return this.httpClient.post(this.url1 + `/rBefore/${id}`, file, this.httpOptions)

  }

  uploadAfterVideo(id,file){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     token: sessionStorage['token']
    //   })
    // };

    // const body = new FormData()
    // body.append('after', file)

    return this.httpClient.post(this.url1 + `/after/${id}`, file, this.httpOptions)

  }
  uploadImage(id,file){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     token: sessionStorage['token']
    //   })
    // };

    // const body = new FormData()
    // body.append('after', file)

    return this.httpClient.post(this.url + `/image/${id}`, file, this.httpOptions)

  }

  // getReview(){
  //   const httpOptions={
  //     headers:new HttpHeaders({
  //       token:sessionStorage['token']
  //     })
  //   }
  //   return this.httpClient.get()
  // }

  // canActivate() {
  //   if (sessionStorage['token']) {
  //     return true
  //   }
  //   this.router.navigate(['/login'])
  //   return false 
  // }

  // getData(){
  //   return this.httpClient.get
  //   ('https://jsonplaceholder.typicode.com/todos');
  // }

  deleteReview(id,name){
    return this.httpClient.post(this.url1 + `/delete-review/${id}/${name}`, this.httpOptions)
  }

  deletePatient(id){
    return this.httpClient.delete(this.url + `/delete/${id}`, this.httpOptions)
  }

  updatePatient(id,Name: string, Address: string, Age: Number, Disease: string[], Treatment: string[],Treatment_Plan: string, day: string,
    day1: string, time: string,time1: string,date: string,session: string,review: string
    ,History: string,Points: string,Phone: number,startDate:Date,endDate:Date){
      const body = {
        Name:Name,
        Address:Address,
        Age:Age,
        Disease:Disease,
        Treatment:Treatment,
        Treatment_Plan:Treatment_Plan,
        day:day,
        day1:day1,
        time:time,
        time1:time1,
        date:date,
        session:session,
        review:review,
        History:History,
        Points:Points,
        Phone:Phone,
        startDate:startDate,
        endDate:endDate,
      }
      return this.httpClient.put(this.url + `/update-patient/${id}`,body, this.httpOptions)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage['token']) {
      return true
    }
    else
    this.router.navigate(['/home'])
    return false 
  }

}
