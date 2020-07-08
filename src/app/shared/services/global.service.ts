import { Injectable, isDevMode } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  log(message: string, data: any = null, type: string = 'log') {
    if (isDevMode()) {
      if (type === 'log') {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'error') {
        console.error(message, data);
      }
    }
  }

  getDirtyValues(formGroup: FormGroup) {
    const dirtyValues = {};
    Object.keys(formGroup.controls).forEach((control) => {
      const currentControl = formGroup.get(control);
      if (currentControl.dirty) {
        dirtyValues[control] = currentControl.value;
      }
    });
    return dirtyValues;
  }

  markAsDirtyForm(fg: FormGroup) {
    const controls = fg.controls;
    _.forEach(controls, (control) => {
      control.markAsTouched(true);
      control.markAsDirty(true);
    });
  }

  getErrorMessage(err: any) {
    this.log('err', err, 'error');
    if (err) {
      if (err.status === 0) {
        return 'Koneksi terputus, silahkan coba lagi';
      } else {
        if (isDevMode()) {
          const errors = _.isArray(err) ? err : err.error.errors;
          return _.map(errors, 'message').join(' ');
        } else {
          return _.isArray(err) ? _.map(err, 'message').join(' ') : 'Terjadi kesalahan, silahkan coba lagi nanti';
        }
      }
    } else {
      return 'Terjadi kesalahan, silahkan coba lagi nanti';
    }
  }
}
