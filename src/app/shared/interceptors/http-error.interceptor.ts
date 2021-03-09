import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private router: Router,
    private toast: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.gs.log('Event from HttpRes (Error Interceptor) -->', event);
          // let okMessage = 'Berhasil';
          // let okTitle = `${(event as any).body.code} - OK`;
          // if (event) {
          //   if ((event as any).body) {
          //     if ((event as any).body.info) {
          //       okTitle = (event as any).body.info;
          //     }
          //     if ((event as any).body.result) {
          //       if ((event as any).body.result.message) {
          //         okMessage = (event as any).body.result.message;
          //       }
          //     }
          //   }
          // }
          // this.toast.success(okMessage, okTitle);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.gs.log('err from interceptor', error);
        // HANDLE ERROR CONDITION HERE!
        // EXAMPLE:
        // if (err.error.code === '402') {this.router.navigate(['/login']);}
        // let errorMessage = 'Gagal';
        // let errorTitle = `${error.status}- ERR`;
        // if (error) {
        //   if (error.error) {
        //     if (error.error.info) {
        //       errorTitle = error.error.info;
        //     }
        //     if (error.error.result) {
        //       if (error.error.result.message) {
        //         errorMessage = error.error.result.message;
        //       }
        //     }
        //   }
        // }
        // this.toast.error(errorMessage, errorTitle);
        return throwError(error);
      })
    );
  }
}
