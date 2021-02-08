import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageTable } from '@shared/models/pageTable';
import { ApiService, GlobalService } from '@shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.scss'],
})
export class PromoListComponent implements OnInit {
  modalRef: BsModalRef;

  page = new PageTable();
  rows = [];

  constructor(
    private api: ApiService,
    private gs: GlobalService,
    private router: Router,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
    private modalService: BsModalService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit(): void {
    console.log('user list');
    this.getData({ offset: 0 });
  }

  getData(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.loader.start();
    this.api
      .getData(
        'admin/promo?pagination=true',
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

  addPromo() {
    this.router.navigate(['member/promo/add']);
  }
}
