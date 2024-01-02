import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, retryWhen, map } from 'rxjs/operators';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        map(Event => {
          if (Event instanceof HttpResponse) {
            Event = Event.clone()
            console.log(Event.body)
            if(Event.body.sql){
              this.toastr.error(Event.body.sqlMessage)
            }
            if (Event.body.errno == -4078)
              this.toastr.error(Event.body.code)
          }
          if (Event instanceof HttpErrorResponse) {
            Event = Event.clone()
            this.toastr.error(Event.statusText)
          }

          return Event;
        }),catchError((error:HttpErrorResponse)=>{
                   let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
                // console.log('This is client side error');
                errorMsg = `Error: ${error.error.message}`;
                this.toastr.error(` error ${error.statusText}`)
            } else {
                // console.log('This is server side error');
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this.toastr.error(` error ${error.statusText}`,"backend Error",)
            }
            // console.log(errorMsg);
            return throwError(errorMsg);

        })
      );





      
    //   .pipe(
    //     map(Event => {
    //         // console.log(HttpErrorResponse)
    //         if (Event instanceof HttpResponse) {
    //             console.log("interceptor")
    //             Event = Event.clone()
    //             let errorNo: any
    //             if (Event.body.status == "error") {
    //                 errorNo = Event.body.error.errno
    //             }

    //             if (Event.body.code != null) {
    //                 if(Event.body.code == "ER_DUP_ENTRY"){
    //                     this.toastr.error("email is already present ")
    //                 }else{
    //                     this.toastr.error("sql server error")
    //                 }

    //             }
    //             if ((Event.body.status == "error") && (Event.status >= 200 && Event.status < 400) && typeof (errorNo) == 'undefined') {
    //                 this.toastr.error(`${Event.body.error}`)
    //                 // console.log(typeof (Event['status']))
    //             }
    //             else if (errorNo) {
    //                 this.toastr.error(" server error")
    //             }
    //         }

    //         return Event;
    //     }), catchError((error: HttpErrorResponse) => {
    //         let errorMsg = '';
    //         if (error.error instanceof ErrorEvent) {
    //             // console.log('This is client side error');
    //             errorMsg = `Error: ${error.error.message}`;
    //             this.toastr.error(` error ${error.statusText}`)
    //         } else {
    //             // console.log('This is server side error');
    //             errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    //             this.toastr.error(` error ${error.statusText}`)
    //         }
    //         // console.log(errorMsg);
    //         return throwError(errorMsg);
    //     })
    // );

  }
}
