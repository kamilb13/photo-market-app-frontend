import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PhotoService} from './photo.service';
import {Photo} from '../models/photo.model';

describe('PhotoService', () => {
  let photoService: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    })
    photoService = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('should return list of categories', () => {
    const mockResponse = ["ANIMALS", "CARS", "OTHER"];

    photoService.getCategories().subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne('http://localhost:8080/categories');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  })

  it('should return list of photos', () => {
    const mockResponse: Photo[] = []

    photoService.getPhotos().subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne('http://localhost:8080/get-photos');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  })

  it('should return photos created by user with given id', () => {
    const testId = 1;
    const mockResponse: Photo = {
      id: 1,
      title: "title",
      description: "desc",
      amount: 123,
      category: "CARS",
      file_path: "/home/user/photo.jpg",
      uploadDate: "2025-06-19 20:50:50.079242",
      owner_id: testId,
      owner_username: "abc",
      imageUrl: "url"
    }

    photoService.getUserPhotos(testId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne(`http://localhost:8080/get-user-photos/${testId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  })

  it('should return photos purchased by user with given id', () => {
    const testId = 1;
    const mockResponse: Photo[] = [{
      id: 1,
      title: "title",
      description: "desc",
      amount: 123,
      category: "CARS",
      file_path: "/home/user/photo.jpg",
      uploadDate: "2025-06-19 20:50:50.079242",
      owner_id: 1,
      owner_username: "abc",
      imageUrl: "url"
    }]
    photoService.getPurchasedPhotosByUser(testId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne(`http://localhost:8080/get-purchased-photos/${testId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  })

  it('should return photo bought by user with given id', () => {
    const testUserId = 1;
    const testPhotoId = 1;
    const mockResponse: Photo = {
      id: testPhotoId,
      title: "title",
      description: "desc",
      amount: 123,
      category: "CARS",
      file_path: "/home/user/photo.jpg",
      uploadDate: "2025-06-19 20:50:50.079242",
      owner_id: 1,
      owner_username: "abc",
      imageUrl: "url"
    }
    photoService.buyPhoto(testUserId, testPhotoId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })

    const req = httpMock.expectOne(`http://localhost:8080/buy-photo`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({userId: testUserId, photoId: testPhotoId});
    req.flush(mockResponse);
  })

  it('should return details of photo with given filename', () => {
    const testFilename = "/home/user/photo.jpg";
    const mockBlob = new Blob([], {type: 'image/jpeg'});

    photoService.getPhotoDetails(testFilename).subscribe(response => {
      expect(response).toEqual(mockBlob)
    })

    const req = httpMock.expectOne(`http://localhost:8080/get-photo/${testFilename}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBlob);
  })
})


