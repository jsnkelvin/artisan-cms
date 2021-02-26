import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PageTable } from '../../../../shared/models/pageTable';
import { ApiService, GlobalService } from '../../../../shared/services';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  today = new Date();

  page = new PageTable();
  rows = [];

  statusData = [];

  status = '1';
  dateRange = [
    new Date(this.today.getFullYear(), this.today.getMonth(), 1),
    new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private loader: NgxUiLoaderService,
    public gs: GlobalService,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit(): void {
    this.getStatus();
  }

  rowClicked($event) {
    if($event.type === 'click') {
      this.router.navigate(['member/order', $event.row.transaction_id]);
    }
  }

  getStatus(pageInfo = { offset: 0 }) {
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset + 1;
    this.loader.start();
    this.api
      .getData(
        'admin/status'
      )
      .subscribe(
        (res) => {
          this.statusData = res.response.rows;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  getData(pageInfo = { offset: 0 }) {
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset + 1;
    this.loader.start();
    this.api
      .getData(
        'admin/transactions?pagination=true',
        { page: this.page.pageNumber, row: this.page.size },
        { order_by: 'created_at', order_type: 'DESC' },
        {
          status_id: this.status,
          start_date: new Date(this.dateRange[0]).toISOString().split('T')[0],
          end_date: new Date(this.dateRange[1]).toISOString().split('T')[0]
        }
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

  downloadCSV(): void {
    this.api.getData('admin/transactions/csv_download', null, null, null, null, true).subscribe((res) => {
      console.log('res', res);
      const blob = new Blob([res], { type: 'text/csv' });
      saveAs(blob, 'this.csv');
      console.log('res', res);
    });
  }

}
