import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';

import { PageTable } from '@shared/models/pageTable';

import { ApiService } from '../../../../shared/services';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss'],
})
export class PromoDetailComponent implements OnInit {

  id = 0;
  detail = null;

  page = new PageTable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private api: ApiService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getDetail();
  }

  back() {
    this.router.navigate(['member/promo']);
  }

  paging(pageInfo): void {
    this.page.pageNumber = pageInfo.offset + 1;
  }

  getDetail(): void {
    this.loader.start();
    this.api
      .getData(
        `admin/promo/${this.id}`,
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.detail = res.response;
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

}
