import { TestBed } from '@angular/core/testing';

import { HttpauthInterceptorService } from './httpauth-interceptor.service';

describe('HttpauthInterceptorService', () => {
  let service: HttpauthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpauthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
