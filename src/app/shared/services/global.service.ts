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
}
