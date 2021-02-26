import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../../shared/services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  id = 0;
  detail = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getDetail();
  }

  back() {
    this.router.navigate(['member/order']);
  }

  getDetail(): void {
    this.loader.start();
    this.api
      .getData(
        `admin/transactions/${this.id}`,
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
