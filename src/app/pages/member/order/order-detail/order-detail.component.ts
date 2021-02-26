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

  @ViewChild('modalInputProofShipment', { static: false }) modalInputProofShipment: ModalDirective;
  isModalInputProofShipment = false;
  disableInputProofShipment = false;

  fgProofShipment: FormGroup;

  @ViewChild('modalShareFilm', { static: false }) modalShareFilm: ModalDirective;
  isModalShareFilm = false;

  @ViewChild('modalGoToProcess', { static: false }) modalGoToProcess: ModalDirective;
  isModalGoToProcess = false;

  @ViewChild('modalEditFilm', { static: false }) modalEditFilm: ModalDirective;
  isModalEditFilmShown = false;

  fgFilmEdit: FormGroup;
  filmEdit = null;

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

  showModalEditFilm(data): void {
    this.filmEdit = data;
    this.fgFilmEdit = new FormGroup({
      film_brand: new FormControl(this.filmEdit?.film_brand, Validators.required),
      film_typeName: new FormControl(this.filmEdit?.film_type?.name, Validators.required),
      film_formatName: new FormControl(this.filmEdit?.film_format?.name, Validators.required),
      scan_typeName: new FormControl(this.filmEdit?.scan_type?.name, Validators.required),
      scannerName: new FormControl(this.filmEdit?.scanner?.name, Validators.required),
      push_pullName: new FormControl(this.filmEdit?.push_pull?.name, Validators.required),
      push_pull_value: new FormControl(this.filmEdit?.push_pull_value, Validators.required),
      number_of_rolls: new FormControl(this.filmEdit?.number_of_rolls, Validators.required),
      additional_notes: new FormControl(this.filmEdit?.additional_notes, Validators.required)
    });
    this.isModalEditFilmShown = true;
  }
 
  hideModalEditFilm(): void {
    this.modalEditFilm.hide();
  }
 
  onHiddenEditFilm(): void {
    this.isModalEditFilmShown = false;
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
    this.hideModalEditFilm();
    this.getDetail();
  }

  showModalGoToProcess(): void {
    this.isModalGoToProcess = true;
  }
 
  hideModalGoToProcess(): void {
    this.modalGoToProcess.hide();
  }
 
  onHiddenGoToProcess(): void {
    this.isModalGoToProcess = false;
  }

  goToProcess(): void {
    this.api
      .putData(
        `admin/transactions/status/processing/${this.id}`
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.hideModalGoToProcess();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.loader.stop();
        }
      );
  }

  showModalShareFilm(): void {
    this.isModalShareFilm = true;
  }
 
  hideModalShareFilm(): void {
    this.modalShareFilm.hide();
  }
 
  onHiddenShareFilm(): void {
    this.isModalShareFilm = false;
  }

  shareFilm(): void {
    this.api
      .putData(
        `admin/transactions/status/shared/${this.id}`
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.hideModalShareFilm();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.loader.stop();
        }
      );
  }

  showModalInputProofShipment(disabled = false): void {
    this.disableInputProofShipment = disabled;
    this.fgProofShipment = new FormGroup({
      courier: new FormControl({ value: this.detail.courier, disabled: this.disableInputProofShipment }, Validators.required,),
      courier_receipt: new FormControl({ value: this.detail.courier_receipt, disabled: this.disableInputProofShipment }, Validators.required)
    });
    this.isModalInputProofShipment = true;
  }
 
  hideModalInputProofShipment(): void {
    this.modalInputProofShipment.hide();
  }
 
  onHiddenInputProofShipment(): void {
    this.isModalInputProofShipment = false;
  }

  inputProofShipment(): void {
    this.api
      .putData(
        `admin/transactions/courier/${this.id}`,
        this.fgProofShipment.value
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.hideModalShareFilm();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.loader.stop();
        }
      );
    this.hideModalInputProofShipment();
    this.getDetail();
  }

}
