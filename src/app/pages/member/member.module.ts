import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { AuthGuardGuard } from '../../shared/guard/auth-guard.guard';
import { ResolveStart, RouterModule, Routes } from '@angular/router';
import { SidebarModule } from '../../shared/component/sidebar/sidebar.module';
import { SharedModule } from '../../shared/shared.module';
import { Roles } from 'src/app/shared/models/role';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      { path: '', redirectTo: 'order', pathMatch: 'full' },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuardGuard],
        data: { roles: [Roles.all] },
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
        canActivate: [AuthGuardGuard],
        data: { roles: [Roles.all] },
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuardGuard],
        data: { roles: [Roles.all] },
      },
      {
        path: 'promo',
        loadChildren: () => import('./promo/promo.module').then((m) => m.PromoModule),
        canActivate: [AuthGuardGuard],
        data: { roles: [Roles.all] },
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then((m) => m.NotificationModule),
        canActivate: [AuthGuardGuard],
        data: { roles: [Roles.all] },
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuardGuard],
        data: { roles: [Roles.all] },
      },
    ],
  },
];

@NgModule({
  declarations: [MemberComponent],
  imports: [CommonModule, SidebarModule, RouterModule.forChild(routes), SharedModule, BsDropdownModule.forRoot()],
})
export class MemberModule {}
