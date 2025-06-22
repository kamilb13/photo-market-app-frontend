import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from './AuthInterceptor';
import {Router} from '@angular/router';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], {url: '/dashboard'});

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: routerSpy},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header if token exists and request is not public', () => {
    localStorage.setItem('jwtToken', 'test-token');

    httpClient.get('/api/private').subscribe();

    const req = httpMock.expectOne('/api/private');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should not add Authorization header to public requests', () => {
    httpClient.get('/auth/google').subscribe();

    const req = httpMock.expectOne('/auth/google');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should redirect to /login on 403 error if not already there', () => {
    spyOn(window, 'alert');
    httpClient.get('/api/protected').subscribe({
      error: () => {
      }
    });

    const req = httpMock.expectOne('/api/protected');
    req.flush({}, {status: 403, statusText: 'Forbidden'});

    expect(window.alert).toHaveBeenCalledWith('Brak dostępu! Zaloguj się.');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

});
