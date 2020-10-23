import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../../shared/services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.userService.currentUserValue;
    if (currentUser && currentUser.username) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.username}`,
        },
      });
    }

    return next.handle(request);
  }
}
