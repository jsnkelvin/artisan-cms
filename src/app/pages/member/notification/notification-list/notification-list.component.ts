import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageTable } from '@shared/models/pageTable';
import { ApiService, GlobalService } from '@shared/services';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  page = new PageTable();
  rows = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(pageInfo = { offset: 0 }) {
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset + 1;
    this.loader.start();
    this.api
      .getData(
        'admin/global_notification?pagination=true',
        { page: this.page.pageNumber, row: this.page.size },
        { order_by: 'created_at', order_type: 'DESC' }
      )
      .subscribe(
        (res) => {
          this.rows = res.response.rows;
          this.page.totalElements = res.response.count;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  addNotif() {
    this.router.navigate(['member/notification/add']);
  }

  rowClicked($event) {
    if($event.type === 'click') {
      this.router.navigate(['member/notification', $event.row.promo_id]);
    }
  }

}
