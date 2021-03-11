import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService, GlobalService } from '../../../../shared/services';

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

  @ViewChild('modalUserPayment', { static: false }) modalUserPayment: ModalDirective;
  isModalUserPayment = false;

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
  pushPullData = [];

  scan_type_id = null;
  film_type_id = null;
  scanner_id = null;

  id = 0;
  detail = null;

  subsParam = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private api: ApiService,
    private toast: ToastrService,
    private gs: GlobalService
  ) { }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe(p => {
      this.id = p.id;
      this.getDetail();
    });
    this.getScanType();
    this.getPushPull();
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
      scan_type_id: new FormControl(this.filmEdit?.scan_type?.scan_type_id, Validators.required),
      film_type_id: new FormControl(this.filmEdit?.film_type?.film_type_id),
      scanner_id: new FormControl(this.filmEdit?.scanner?.scanner_id),
      film_format_id: new FormControl(this.filmEdit?.film_format?.film_format_id),
      push_pull_id: new FormControl(this.filmEdit?.push_pull?.push_pull_id, Validators.required),
      push_pull_value: new FormControl(this.filmEdit?.push_pull_value, Validators.required),
      number_of_rolls: new FormControl(this.filmEdit?.number_of_rolls, Validators.required),
      additional_notes: new FormControl(this.filmEdit?.additional_notes, Validators.required)
    });
    this.isModalEditFilmShown = true;
    this.filmTypeData = [];
    this.scannerData = [];
    this.filmFormatData = [];
    if (this.filmEdit?.scan_type?.scan_type_id) {
      this.getFilmType(this.filmEdit.scan_type.scan_type_id);
    }
    if (this.filmEdit?.film_type?.film_type_id) {
      this.getScanner(this.filmEdit.film_type.film_type_id);
    }
    if (this.filmEdit?.scanner?.scanner_id) {
      this.getFilmFormat(this.filmEdit.scanner.scanner_id);
    }
  }
 
  hideModalEditFilm(): void {
    this.modalEditFilm.hide();
  }

  onHiddenEditFilm(): void {
    this.isModalEditFilmShown = false;
  }

  resetFilmType(): void {
    this.fgFilmEdit.controls.film_type_id.patchValue(null);
    this.fgFilmEdit.controls.film_type_id.markAsDirty();
    this.resetScanner();
  }

  resetScanner(): void {
    this.fgFilmEdit.controls.scanner_id.patchValue(null);
    this.fgFilmEdit.controls.scanner_id.markAsDirty();
    this.resetFilmFormat();
  }

  resetFilmFormat(): void {
    this.fgFilmEdit.controls.film_format_id.patchValue(null);
    this.fgFilmEdit.controls.film_format_id.markAsDirty();
  }

  getFilmType(data) {
    this.filmTypeData = [];
    this.scannerData = [];
    this.filmFormatData = [];
    this.scan_type_id = data;
    this.api
      .getData(
        `admin/lists/film_type?scan_type_id=${this.scan_type_id}`
      )
      .subscribe(
        (res) => {
          this.filmTypeData = res.response;
          console.log('res', res);
        },
        (err) => {
          console.log('err', err);
        }
      );
  }

  getFilmFormat(data) {
    this.filmFormatData = [];
    this.scanner_id = data;
    this.api
      .getData(
        `admin/lists/film_format?scan_type_id=${this.scan_type_id}&film_type_id=${this.film_type_id}&scanner_id=${this.scanner_id}`
      )
      .subscribe(
        (res) => {
          this.filmFormatData = res.response;
          console.log('res', res);
        },
        (err) => {
          console.log('err', err);
        }
      );
  }

  getScanType() {
    this.loader.start();
    this.api
      .getData(
        'admin/lists/scan_type'
      )
      .subscribe(
        (res) => {
          this.scanTypeData = res.response;
          console.log('res', res);
          this.loader.stop();
        },
        (err) => {
          this.loader.stop();
          console.log('err', err);
        }
      );
  }

  getScanner(data) {
    this.scannerData = [];
    this.filmFormatData = [];
    this.film_type_id = data;
    this.api
      .getData(
        `admin/lists/scanner?scan_type_id=${this.scan_type_id}&film_type_id=${this.film_type_id}`
      )
      .subscribe(
        (res) => {
          this.scannerData = res.response;
          console.log('res', res);
        },
        (err) => {
          this.scannerData = [];
          console.log('err', err);
        }
      );
  }

  getPushPull() {
    this.loader.start();
    this.api
      .getData(
        'user/push_pull/list'
      )
      .subscribe(
        (res) => {
          this.pushPullData = res.response.rows;
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
    this.api
      .putData(
        `admin/film/${this.filmEdit.film_id}`,
        this.gs.getDirtyValues(this.fgFilmEdit)
      )
      .subscribe(
        (res) => {
          console.log('res', res);
          this.toast.success('Save Film Success');
          this.hideModalEditFilm();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.toast.success('Failed To Save Film');
          this.loader.stop();
        }
      );
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
          this.toast.success('Process Success');
          this.hideModalGoToProcess();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.toast.success('Failed To Process');
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
          this.toast.success('Share Film Success');
          this.hideModalShareFilm();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.toast.success('Failed To Share Film');
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
          this.toast.success('Input Proof Of Shipment Success');
          this.hideModalInputProofShipment();
          this.getDetail();
          this.loader.stop();
        },
        (err) => {
          console.log('err', err);
          this.toast.success('Failed To Input Proof Of Shipment');
          this.loader.stop();
        }
      );
  }

  showModalUserPayment(): void {
    this.isModalUserPayment = true;
  }

  hideModalUserPayment(): void {
    this.modalUserPayment.hide();
  }

  onHiddenUserPayment(): void {
    this.isModalUserPayment = false;
  }

}
