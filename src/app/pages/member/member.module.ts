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
      { path: '', redirectTo: 'user', pathMatch: 'full' },
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
    ],
  },
];

@NgModule({
  declarations: [MemberComponent],
  imports: [CommonModule, SidebarModule, RouterModule.forChild(routes), SharedModule, BsDropdownModule.forRoot()],
})
export class MemberModule {}
