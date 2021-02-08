import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CacheService } from 'src/app/shared/services';
// import { Admin } from "src/app/shared/models/admin";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  userType: any = null;
  titleHeader: string = '';
  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(private router: Router, public authSrv: AuthenticationService, private cache: CacheService) {}

  ngOnInit() {
    this.userType = this.cache.currentUser.type;
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    console.log('user role -->', this.userType);
    if (environment.production === true) {
      this.titleHeader = 'LINIPOIN CMS';
    } else {
      this.titleHeader = 'LINIPOIN CMS [DEV]';
    }

    if (this.router.isActive('member/setup', false)) this.addExpandClass('setting');
    if (this.router.isActive('member/linireward', false)) this.addExpandClass('rewards');
    if (this.router.isActive('member/vendor', false)) this.addExpandClass('rewards');
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (this.collapsed) {
      this.collapsed = !this.collapsed;
      this.collapsedEvent.emit(this.collapsed);
    }
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
}
