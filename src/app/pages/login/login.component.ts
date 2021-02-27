import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  show = false;
  constructor(
    public fb: FormBuilder,
    public gs: GlobalService,
    public router: Router,
    public authSrv: AuthenticationService,
    public loading: NgxUiLoaderService,
    public toast: ToastrService
  ) {
    this.loginForm = fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get loginFormVal() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.authSrv.isAuthenticated([]).subscribe((exists) => {
      if (exists) {
        this.router.navigate(['/member']);
      }
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  onClickedSubmit() {
    this.submitted = true;
    console.log('submitted', this.submitted);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.gs.log('-->', this.loginForm.value);
    if (this.loginForm.valid) {
      this.submitted = true;
      this.loading.start();
      this.authSrv.login(this.loginForm.value).subscribe(
        (res: any) => {
          this.gs.log('--> sukses login sebelum if', res.result);
          if (res.response) {
            this.gs.log('--> sukses login', res.result);
            this.loading.stop();
            this.router.navigate(['/member']);
            //   this.toast.success(res.result.message, "Success");
          } else {
            this.loading.stop();
            // this.toast.warning(res.result.message, "Failed");
          }
        },
        (err) => {
          this.gs.log('ERROR LOGIN -->', err);
          this.loading.stop();
          /*  if(err.error.result.code === "AU001"){
            this.toast.warning("Email not registered","Failed")
          }
          if(err.error.result.code === "AU002"){
            this.toast.warning("Pasword you entered is wrong","Failed")
          } */
          // this.toast.error(err.error.result.message, "Error");
        }
      );
    }
  }
}
