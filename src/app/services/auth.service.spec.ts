import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideStore, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {SocialUser} from '@abacritt/angularx-social-login';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const store = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {provide: Router, useValue: router},
        {provide: Store, useValue: store}
      ],
    })
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  })

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  })

  it('should register user with given data', () => {
    const testData = {
      name: "name",
      surname: "surname",
      password: "password",
      email: "abc@abc",
      phoneNumber: "123456789",
    }
    const mockResponse = {success: true}

    authService.registerUser(testData.name, testData.surname, testData.password, testData.email, testData.phoneNumber).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne('http://localhost:8080/auth/register');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  })

  it('should login with given email and password', () => {
    const testData = {
      email: "abc@abc",
      password: "abc",
    }
    const mockResponse = {success: true}

    authService.loginWithEmail(testData.email, testData.password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  })

  it('should logout user', () => {
    localStorage.setItem('jwtToken', 'token');
    localStorage.setItem('refreshToken', 'refresh');

    authService.logout();

    expect(localStorage.getItem('jwtToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], {replaceUrl: true});
  })

  it('should login with Google', () => {
    const testSocialUser: SocialUser = {
      idToken: 'fake-google-id-token',
    } as SocialUser;

    const mockResponse = {
      jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
    };

    authService.loginWithGoogle(testSocialUser).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/auth/google');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({idToken: 'fake-google-id-token'});

    req.flush(mockResponse);

    expect(localStorage.getItem('jwtToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30');
    expect(localStorage.getItem('refreshToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
})
