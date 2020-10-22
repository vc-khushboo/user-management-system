import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserResponse } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'name', 'phone', 'age', 'address', 'actions'];
  dataSource: UserResponse[];
  constructor(public loaderService: LoaderService,
              private userService: UserService,
              public toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.loaderService.startLoading();
    this.userService.getUsersList()
    .subscribe(
        res => {
          this.dataSource = res;
          this.loaderService.stopLoading();
        });
  }

  deleteUser(id: number): void {
    if (id !== null) {
      this.loaderService.startLoading();
      this.userService.deleteUser(id)
      .subscribe(
          res => {
            this.getUsers();
            this.loaderService.stopLoading();
          });
    } else {
      this.toastr.error('Invalid id');
    }
  }

}
