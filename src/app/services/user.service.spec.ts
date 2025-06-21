import {UserService} from './user.service';
import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        UserService
      ]
    })
    userService = TestBed.inject(UserService);
  })

  it('should return full username for given email', () => {
    const testEmail = 'abc@abc';
    const mockResponse = {username: 'abc abc'};

    userService.getFullUsernameByEmail(testEmail).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })
  })

  it('should return full username for given id', () => {
    const testId = 1;
    const mockResponse = {username: 'abc@abc'};

    userService.getFullUsernameById(testId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })
  })
})
