import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, CacheService, GlobalService } from '@shared/services';
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

  notif = [];

  constructor(
    public authSrv: AuthenticationService,
    private cache: CacheService,
    public router: Router,
    private gs: GlobalService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    //    this.userType = this.cache.currentUser.type;
    this.pushRightClass = 'push-right';
    console.log('member');
    setInterval(() => this.getNotif(), 2468);
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

  getNotif(): void {
    this.api
      .getData(
        `admin/admin_notification`,
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.notif = res.response.rows;
        },
        (err) => {
          console.log('err', err);
        }
      );
  }

  openNotif(notifData): void {
    this.api
      .putData(
        `admin/admin_notification/${notifData.admin_notification_id}`,
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.router.navigateByUrl(`member/order/${notifData.transaction_id}`);
        },
        (err) => {
          console.log('err', err);
        }
      );
  }
}
