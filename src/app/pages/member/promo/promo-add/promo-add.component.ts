import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@shared/services/core/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-promo-add',
  templateUrl: './promo-add.component.html',
  styleUrls: ['./promo-add.component.scss'],
})
export class PromoAddComponent implements OnInit {
  fg: FormGroup;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private api: ApiService,
    private loader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fg = new FormGroup({
      name: new FormControl('', Validators.required),
      total_limit: new FormControl('', Validators.required),
      user_limit: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  submit() {
    console.log('this.fg.value', this.fg.value);

    this.loader.start();

    const body = this.fg.value;

    this.api.postData('admin/promo', body).subscribe(
      (res) => {
        //  console.log('res',res);
        this.loader.stop();
        this.toast.success('Add Promo Code Success');
        this.router.navigate(['member/promo']);
      },
      (err) => {
        this.loader.stop();
        this.toast.error('Failed to Add Promo Code');
      }
    );
  }

  back() {
    this.router.navigate(['member/promo']);
  }
}
