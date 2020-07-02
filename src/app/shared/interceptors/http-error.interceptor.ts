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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private gs: GlobalService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.gs.log('Event from HttpRes (Error Interceptor) -->', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.gs.log('err from interceptor', error);
        // HANDLE ERROR CONDITION HERE!
        // EXAMPLE:
        // if (err.error.code === '402') {this.router.navigate(['/login']);}
        return throwError(error);
      })
    );
  }
}
