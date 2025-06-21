import {UserService} from './user.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  });

  it('should return full username for given email', () => {
    const testEmail = 'abc@abc';
    const mockResponse = {username: 'abc abc'};

    userService.getFullUsernameByEmail(testEmail).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne('http://localhost:8080/username');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: testEmail });
    req.flush(mockResponse);
  })

  it('should return full username for given id', () => {
    const testId = 1;
    const mockResponse = {username: 'abc@abc'};

    userService.getFullUsernameById(testId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne(`http://localhost:8080/username/${testId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  })
})
