import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PageTable } from '../../../../shared/models/pageTable';
import { ApiService } from '../../../../shared/services';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

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
    this.getData({ offset: 0 });
  }

  getData(pageInfo) {
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset + 1;
    this.loader.start();
    this.api
      .getData(
        'admin/chat'
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

  rowClicked($event) {
    if($event.type === 'click') {
      this.router.navigate(['member/chat', $event.row.user_id]);
    }
  }

}
