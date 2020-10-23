import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    public toastr: ToastrService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.LoginForm.controls;
  }

  // Submit user login form and getting token
  loginUser(): void {
    this.loaderService.startLoading();
    if (this.LoginForm.invalid) {
      return;
    }
    this.userService
      .userLogin({
        username: this.f.email.value,
        password: this.f.password.value,
      })
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        if (res.user.userrole === '1') {
          this.router.navigate(['admin/user/list']);
        } else {
          this.router.navigate(['profile']);
        }
        this.userService.currentUserSubject.next(res.user);
        this.loaderService.stopLoading();
      });
  }
}
