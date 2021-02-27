import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent,
  },
  {
    path: 'add',
    component: NotificationAddComponent,
  },
];

@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ]
})
export class NotificationModule { }
