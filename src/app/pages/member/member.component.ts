import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService, GlobalService } from '@shared/services';
import { AuthenticationService } from '../../shared/services/authentication.service';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  public pushRightClass: string;
  isNavbarCollapsed = false;
  collapedSideBar: boolean;
  userType: any = null;
  constructor(
    public authSrv: AuthenticationService,
    private cache: CacheService,
    public router: Router,
    private gs: GlobalService
  ) {}

  ngOnInit(): void {
    //    this.userType = this.cache.currentUser.type;
    this.pushRightClass = 'push-right';
    console.log('member');
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  closeSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.remove(this.pushRightClass);
  }
}
