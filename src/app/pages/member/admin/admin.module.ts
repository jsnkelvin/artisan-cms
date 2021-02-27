import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminAddComponent } from './admin-add/admin-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
  },
  {
    path: 'add',
    component: AdminAddComponent,
  },
];

@NgModule({
  declarations: [AdminListComponent, AdminAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ]
})
export class AdminModule { }
