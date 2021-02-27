import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@shared/services/core/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalService } from '../../../../shared/services';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {

  fg: FormGroup;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private api: ApiService,
    private loader: NgxUiLoaderService,
    public gs: GlobalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fg = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    console.log('this.fg.value', this.fg.value);

    this.loader.start();

    const body = this.fg.value;

    this.api.postData('admin/admin', body).subscribe(
      (res) => {
        //  console.log('res',res);
        this.loader.stop();
        this.toast.success('Add Admin Success');
        this.router.navigate(['member/admin']);
      },
      (err) => {
        this.loader.stop();
        this.toast.error('Failed to Add Admin');
      }
    );
  }

  back() {
    this.router.navigate(['member/admin']);
  }

}
