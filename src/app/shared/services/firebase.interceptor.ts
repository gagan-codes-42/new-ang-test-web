import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FbAuthService } from './auth.service';

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {
  constructor(private authSvc: FbAuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: this.authSvc.userToken,
      }),
    });

    return next.handle(authReq);
  }
}
