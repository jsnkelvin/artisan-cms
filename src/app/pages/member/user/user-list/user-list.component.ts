import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, GlobalService } from '@shared/services';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PageTable } from 'src/app/shared/models/pageTable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  page = new PageTable();
  rows = [];

  fg: FormGroup;

  constructor(
    private api: ApiService,
    private gs: GlobalService,
    private router: Router,
    private toast: ToastrService,
    private loader: NgxUiLoaderService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit(): void {
    // console.log('user list')
    this.getData({ offset: 0 });
    // this.initForm();
  }

  initForm() {
    this.fg = new FormGroup({});
  }

  getData(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loader.start();
    this.api
      .getData(
        'admin/users?pagination=true',
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

  detail(test) {}

  deleteModal(asd) {}

  downCSV() {
    this.api.getData('admin/users/csv_download', null, null, null, null, true).subscribe((res) => {
      console.log('res', res);
      const blob = new Blob([res], { type: 'text/csv' });
      saveAs(blob, 'this.csv');
      console.log('res', res);
    });
  }
}
