import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserResponse } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userId: string;
  UserForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              public loaderService: LoaderService,
              private route: ActivatedRoute) {
                this.initializeUserForm();
               }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      if (this.userId) {
        this.getUserById();
      }
    });
  }

  get f() { return this.UserForm.controls; }

  initializeUserForm() {
    this.UserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]),
      address: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  submitUser(): void {
    this.loaderService.startLoading();
    if (this.UserForm.invalid) {
      return;
    }
    if (this.userId) {
      this.UserForm.value.id = Number(this.userId);
    }
    this.userService.addEditUser(this.UserForm.value, this.userId)
    .subscribe(
        (res: any) => {
          this.router.navigate(['admin/user/list']);
          this.loaderService.stopLoading();
        });
  }

  getUserById(): void {
    this.userService.getUserById(this.userId)
    .subscribe(
        (res: UserResponse) => {
          this.UserForm.patchValue(res);
          this.loaderService.stopLoading();
        });
  }
}
