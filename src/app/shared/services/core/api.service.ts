import { Injectable } from '@angular/core';

import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, map, timeout, retryWhen, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page } from '@shared/models/page';
import { Sort } from '@shared/models/sort';
import { environment } from '@env/environment';

import * as _ from 'lodash';

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = [],
}: {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find((e) => e === error.status)) {
        return throwError(error);
      }
      // console.log(
      //   `Attempt ${retryAttempt}: retrying in ${retryAttempt *
      //     scalingDuration}ms`
      // );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    })
    // finalize(() => console.log('We are done!'))
  );
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(
    path: string,
    pagination: Page = null,
    ordering: Sort = null,
    filter: object = null,
    headers: any = null
  ): Observable<any> {
    const params = this.prepareHttpParams(pagination, ordering, filter);
    const options = { params };
    if (headers) {
      Object.assign(options, { headers });
    }

    return this.http.get(`${environment.api_url}${path}`, options).pipe(
      map((res: Response) => {
        return res;
      }),
      timeout(3000),
      // retry(3)
      retryWhen(
        genericRetryStrategy({
          scalingDuration: 2000,
          excludedStatusCodes: [400, 422, 404, 500],
        })
      ),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getRawData(path: string, filter: any = null, headers: any = null): Observable<any> {
    const params = this.prepareHttpParams(null, null, filter);
    const options = { params };
    if (headers) {
      Object.assign(options, { headers });
    }

    return this.http.get(`${path}`, options).pipe(
      map((res: Response) => {
        return res;
      }),
      timeout(3000),
      // retry(3)
      // retryWhen(
      //   genericRetryStrategy({
      //     scalingDuration: 2000,
      //     excludedStatusCodes: [400, 422, 404, 500]
      //   })
      // ),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  postData(path: string, model: object = {}, multipart = false, apiTimeout = 3000): Observable<any> {
    const options = {};
    let body = model;
    if (multipart) {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });

      body = this.prepareFormData(model);
    }

    return this.http.post(environment.api_url + path, body, options).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(multipart ? 15000 : apiTimeout)
      // retry(3)
    );
  }

  patchData(path: string, model: object = {}, multipart = false): Observable<any> {
    const options = {};
    let body = model;
    if (multipart) {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });

      body = this.prepareFormData(model);
    }

    return this.http.patch(environment.api_url + path, body, options).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(3000)
    );
  }

  putData(path: string, model: object = {}, multipart = false): Observable<any> {
    const options = {};
    let body = model;
    if (multipart) {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });

      body = this.prepareFormData(model);
    }

    return this.http.put(environment.api_url + path, body, options).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(3000)
    );
  }

  deleteData(path: string): Observable<any> {
    return this.http.delete(environment.api_url + path).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(3000)
    );
  }

  private prepareFormData(data) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return formData;
  }

  private prepareHttpParams(pagination: Page, ordering: Sort, filter: any) {
    let params = new HttpParams();

    if (!_.isEmpty(pagination)) {
      params = params.append('row', pagination.row.toString());
      params = params.append('page', pagination.page.toString());
    } else {
      params = params.append('pagination', 'false');
    }

    if (!_.isEmpty(ordering)) {
      params = params.append('order_by', ordering.orderBy);
      params = params.append('order_type', ordering.orderType);
    }

    if (!_.isEmpty(filter)) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          if (_.isArray(filter[key])) {
            for (const index in filter[key]) {
              if (filter[key].hasOwnProperty(index)) {
                params = params.append(key, filter[key][index]);
              }
            }
          } else {
            params = params.append(key, filter[key]);
          }
        }
      }
    }

    return params;
  }
}
