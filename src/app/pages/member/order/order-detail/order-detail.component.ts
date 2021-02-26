import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../../shared/services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  isModalShown = false;

  fg: FormGroup;
  detailEdit = null;

  filmTypeData = [];
  filmFormatData = [];
  scanTypeData = [];
  scannerData = [];

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
    this.getFilmType();
    this.getFilmFormat();
    this.getScanType();
    this.getScanner();
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

  showModal(data): void {
    this.detailEdit = data;
    this.fg = new FormGroup({
      film_brand: new FormControl(this.detailEdit.film_brand, Validators.required),
      film_typeName: new FormControl(this.detailEdit.film_type.name, Validators.required),
      film_formatName: new FormControl(this.detailEdit.film_format.name, Validators.required),
      scan_typeName: new FormControl(this.detailEdit.scan_type.name, Validators.required),
      scannerName: new FormControl(this.detailEdit.scanner.name, Validators.required),
      push_pullName: new FormControl(this.detailEdit.push_pull.name, Validators.required),
      push_pull_value: new FormControl(this.detailEdit.push_pull_value, Validators.required),
      number_of_rolls: new FormControl(this.detailEdit.number_of_rolls, Validators.required),
      additional_notes: new FormControl(this.detailEdit.additional_notes, Validators.required)
    });
    this.isModalShown = true;
  }
 
  hideModal(): void {
    this.autoShownModal.hide();
  }
 
  onHidden(): void {
    this.isModalShown = false;
  }

  getFilmType() {
    this.loader.start();
    this.api
      .getData(
        'admin/film_type'
      )
      .subscribe(
        (res) => {
          this.filmTypeData = res.response.rows;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  getFilmFormat() {
    this.loader.start();
    this.api
      .getData(
        'admin/film_format'
      )
      .subscribe(
        (res) => {
          this.filmFormatData = res.response.rows;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  getScanType() {
    this.loader.start();
    this.api
      .getData(
        'admin/scan_type'
      )
      .subscribe(
        (res) => {
          this.scanTypeData = res.response.rows;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  getScanner() {
    this.loader.start();
    this.api
      .getData(
        'admin/scanner'
      )
      .subscribe(
        (res) => {
          this.scannerData = res.response.rows;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  saveFilm(): void {
    this.hideModal();
    this.getDetail();
  }

}
