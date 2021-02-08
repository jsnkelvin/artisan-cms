import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoDetailComponent } from './promo-detail/promo-detail.component';
import { PromoListComponent } from './promo-list/promo-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SidebarModule } from '@shared/component/sidebar/sidebar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PromoAddComponent } from './promo-add/promo-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PromoListComponent,
  },
  {
    path: 'detail/:id',
    component: PromoDetailComponent,
  },
  {
    path: 'add',
    component: PromoAddComponent,
  },
];

@NgModule({
  declarations: [PromoDetailComponent, PromoListComponent, PromoAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SidebarModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
  ],
})
export class PromoModule {}
