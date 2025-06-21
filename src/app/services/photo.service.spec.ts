import {TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {PhotoService} from './photo.service';

describe('PhotoService', () => {
  let photoService: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        provideHttpClientTesting()
      ]
    })
    photoService = TestBed.inject(PhotoService);
  })

  it('should return list of categories', () => {

  })
})
