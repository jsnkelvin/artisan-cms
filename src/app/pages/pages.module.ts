import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      // AUTH GUARD USAGE EXAMPLE
      // MATCH ROLE PARAMETER WITH RETURN FROM API RESPONSE

      //  {
      //   path: 'activated-example',
      //   loadChildren: () => import('./activated-example/activate-example.module').then(m => m.ActivatedExampleModule),
      //   canActivate: [AuthGuardService],
      //   data: {roles: [Roles.user]}
      // }
    ],
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
