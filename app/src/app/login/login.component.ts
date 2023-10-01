import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email = ''
  password = ''

  constructor(
    private router: Router,
    private adminService: AdminService,
    // private toastr: ToastrService
    ) {}

  ngOnInit(): void {
  }

  onLogin() {
    if(this.email.length == 0){
      // this.toastr.warning("please enter email ", 'login component', {
      //   closeButton: true
      // });
    }else if(this.password.length == 0){
      // this.toastr.warning("please enter password", 'login component', {
      //   closeButton: true
      // });
    }else{
      this.adminService
      .login(this.email, this.password)
      .subscribe(response => {
        if (response['status'] == 'success') {
          const data = response['data']

          sessionStorage['token'] = data['token']
          sessionStorage['firstName'] = data['firstName']
          sessionStorage['lastName'] = data['lastName']
          sessionStorage['email']= data['email']
          // this.toastr.success(`welcome ${sessionStorage['firstName']}`, 'login component', {
          //   closeButton: true
          // });

          this.router.navigate(['/user-list'])

        }
      })
    }
  }


}
