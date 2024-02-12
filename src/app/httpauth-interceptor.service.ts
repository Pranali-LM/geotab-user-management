import { Injectable } from '@angular/core';
import { LmApiService } from './lm-api.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpauthInterceptorService {
  private lmAccessTokenValue = '';

  constructor(private lmApi: LmApiService) {
    this.lmApi.lmAccessToken.subscribe(
      (value) => (this.lmAccessTokenValue = value)
    );
   }
   intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set('x-access-token', this.lmAccessTokenValue),
    });

    return next.handle(request);
  }
}
