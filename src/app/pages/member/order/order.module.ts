import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
  },
  {
    path: ':id',
    component: OrderDetailComponent,
  },
];

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrderModule { }
