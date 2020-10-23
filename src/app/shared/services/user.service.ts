import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  User,
  Login,
  EditProfile,
  AddEditUser,
  LoginResponse,
  UserResponse,
  SuccessResponse,
} from './../models/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.url;

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public userLogin(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  public getUsersList(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`);
  }

  public addEditUser(
    data: AddEditUser,
    flag: string
  ): Observable<SuccessResponse> {
    if (flag) {
      return this.http.put<SuccessResponse>(`${this.apiUrl}/user/edit`, data);
    } else {
      return this.http.post<SuccessResponse>(`${this.apiUrl}/user/add`, data);
    }
  }

  public getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/user/${id}`);
  }

  public deleteUser(id: number): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(`${this.apiUrl}/user/${id}`);
  }

  public updateProfile(data: EditProfile): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${this.apiUrl}/profile`, data);
  }
}
