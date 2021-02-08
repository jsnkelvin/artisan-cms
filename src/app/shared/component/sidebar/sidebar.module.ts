import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, SharedModule, CollapseModule.forRoot(), TooltipModule.forRoot(), RouterModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
