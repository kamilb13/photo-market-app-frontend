import {UserService} from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    })
  })

  it('should return full username for given email', () => {
    const testEmail = 'user@example.com'
    const mockResponse = { username: 'user'};

    service.getFullUsernameByEmail(testEmail).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

  })

})
