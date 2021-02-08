import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SidebarModule } from '@shared/component/sidebar/sidebar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: ':id',
    component: UserDetailComponent,
  },
];

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, SidebarModule, NgxDatatableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
