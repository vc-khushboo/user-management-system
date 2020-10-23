import { TestBed, inject, async, tick, fakeAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let userService: UserService;
  const responseObject = {
    result: 'success',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get the list of products from the server', () => {
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

    userService.getUsersList().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(userList);
    });

    const req = httpMock.expectOne('http://localhost:8000/users');
    expect(req.request.method).toEqual('GET');
    req.flush(userList);

    httpMock.verify();
  });

  it('should get user by id from the server', () => {
    const user = {
      address: 'surat',
      age: 23,
      id: 1,
      name: 'admin',
      password: '1234',
      phone: 45687444,
      username: 'admin@vc.com',
      userrole: '1',
    };

    userService.getUserById('1').subscribe((res) => {
      expect(res).toEqual(user);
    });

    const req = httpMock.expectOne(`http://localhost:8000/user/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(user);

    httpMock.verify();
  });

  it('should perform login correctly', () => {
    const loginSuccessResponse = {
      token: 'dummytoken',
      user: {
        id: 1,
        username: 'test@test.com',
        userrole: '1',
      },
    };
    const user = { username: 'test@example.com', password: 'testpassword' };

    userService.userLogin(user).subscribe((receivedResponse: any) => {
      expect(receivedResponse).toEqual(loginSuccessResponse);
    });

    const requestWrapper = httpMock.expectOne({
      url: 'http://localhost:8000/auth/login',
    });
    expect(requestWrapper.request.method).toEqual('POST');
    expect(requestWrapper.request.body).toEqual(user);
    requestWrapper.flush(loginSuccessResponse);

    httpMock.verify();
  });

  it('should fail login correctly', () => {
    const failedResponse = {
      status: 401,
      message: 'Incorrect username or password',
    };
    const user = { username: 'test@example.com', password: 'xyz' };

    userService.userLogin(user).subscribe((receivedResponse: any) => {
      expect(receivedResponse).toEqual(failedResponse);
    });

    const requestWrapper = httpMock.expectOne({
      url: 'http://localhost:8000/auth/login',
    });
    expect(requestWrapper.request.method).toEqual('POST');
    expect(requestWrapper.request.body).toEqual(user);
    requestWrapper.flush(failedResponse);

    httpMock.verify();
  });

  it('should update user profile', () => {
    const profileData = {
      address: 'surat',
      age: 23,
      id: 1,
      name: 'admin',
      password: '1234',
      phone: 45687444,
      userrole: '1',
    };

    userService.updateProfile(profileData).subscribe((res: any) => {
      expect(res).toEqual(responseObject);
    });

    const requestWrapper = httpMock.expectOne({
      url: 'http://localhost:8000/profile',
    });
    expect(requestWrapper.request.method).toEqual('PUT');
    expect(requestWrapper.request.body).toEqual(profileData);
    requestWrapper.flush(responseObject);

    httpMock.verify();
  });

  it('should delete user', () => {
    const userId = 1;
    userService.deleteUser(userId).subscribe((res: any) => {
      expect(res).toEqual(responseObject);
    });

    const requestWrapper = httpMock.expectOne({
      url: `http://localhost:8000/user/${userId}`,
    });
    expect(requestWrapper.request.method).toEqual('DELETE');
    requestWrapper.flush(responseObject);

    httpMock.verify();
  });

  it('should add user', () => {
    const userId = null;
    const inputData = {
      address: 'surat',
      age: 23,
      name: 'admin',
      password: '1234',
      phone: 45687444,
      userrole: '1',
      username: 'admin@vc.com',
    };
    userService.addEditUser(inputData, userId).subscribe((res: any) => {
      expect(res).toEqual(responseObject);
    });

    const requestWrapper = httpMock.expectOne({
      url: `http://localhost:8000/user/add`,
    });
    expect(requestWrapper.request.method).toEqual('POST');
    expect(requestWrapper.request.body).toEqual(inputData);
    requestWrapper.flush(responseObject);

    httpMock.verify();
  });

  it('should edit user', () => {
    const userId = '1';
    const editUserData = {
      address: 'surat',
      age: 23,
      name: 'admin',
      password: '1234',
      phone: 45687444,
      userrole: '1',
      username: 'admin@vc.com',
      id: 1,
    };
    userService.addEditUser(editUserData, userId).subscribe((res: any) => {
      expect(res).toEqual(responseObject);
    });

    const requestWrapper = httpMock.expectOne({
      url: `http://localhost:8000/user/edit`,
    });
    expect(requestWrapper.request.method).toEqual('PUT');
    expect(requestWrapper.request.body).toEqual(editUserData);
    requestWrapper.flush(responseObject);

    httpMock.verify();
  });
});
