import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost:3000/patient'

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }
  
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.httpClient.post(this.url + '/signin', body)
  }

  signup(Name: string, Address: string, Age: string, Disease: string, Treatment: string[],Treatment_Plan: string, day: string,
     day1: string, time: string,time1: string,date: string,session: string,review: string) {
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
      review:review
    }

    return this.httpClient.post(this.url + "/signup", body)
  }
  getData() {
    return this.httpClient.get(this.url + "/patientData")
  }
  getName(Name: string) {
    // const body ={
    //   Name:Name
    // }
    console.log(this.url + "/name")
    return this.httpClient.get(this.url + "/name"+Name)

  }

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

}
