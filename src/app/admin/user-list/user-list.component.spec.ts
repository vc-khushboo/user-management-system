import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './user-list.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/user.service';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

describe('Component: UserList', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const userList = [
    {
      address: 'surat',
      age: 23,
      id: 1,
      name: 'admin',
      password: '1234',
      phone: 45687444,
      username: 'admin@vc.com',
      userrole: '1',
    },
    {
      address: 'surat',
      age: 23,
      id: 1,
      name: 'user',
      password: '1234',
      phone: 45687444,
      username: 'user@vc.com',
      userrole: '2',
    },
  ];

  const updatedList = [
    {
      address: 'surat',
      age: 23,
      id: 1,
      name: 'user',
      password: '1234',
      phone: 45687444,
      username: 'user@vc.com',
      userrole: '2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        CommonModule,
        SharedModule,
        MatTableModule,
      ],
      declarations: [UserListComponent],
    });

    fixture = TestBed.createComponent(UserListComponent);

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create userlist component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the userList from the userservice', fakeAsync(() => {
    const userService = fixture.debugElement.injector.get(UserService);
    jest.spyOn(userService, 'getUsersList').mockImplementation(() => {
      return Rx.of(userList).pipe(delay(2000));
    });
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getUsers());
    tick(2000);
    expect(component.dataSource).toEqual(userList);
  }));
});
