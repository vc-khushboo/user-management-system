import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserResponse } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit {
  user: any;
  ProfileForm: FormGroup;

  constructor(
    private userService: UserService,
    public loaderService: LoaderService
  ) {
    this.initializeProfileForm();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getUserById();
  }

  initializeProfileForm() {
    this.ProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      address: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  updateProfile(): void {
    this.loaderService.startLoading();
    if (this.ProfileForm.invalid) {
      return;
    }
    const inputData = JSON.parse(JSON.stringify(this.ProfileForm.value));
    delete inputData.username;
    inputData.id = Number(this.user.id);
    this.userService.updateProfile(inputData).subscribe((res: any) => {
      this.loaderService.stopLoading();
    });
  }

  getUserById(): void {
    this.userService
      .getUserById(this.user.id)
      .subscribe((res: UserResponse) => {
        this.ProfileForm.patchValue(res);
        this.loaderService.stopLoading();
      });
  }
}
