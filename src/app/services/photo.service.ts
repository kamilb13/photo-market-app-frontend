import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo.model';

interface BuyPhotoRequestDto {
  userId: number;
  photoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  private apiUrl: string = 'http://localhost:8080/get-photos';

  constructor(private http: HttpClient) {
  }

  getPhotos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPhotoDetails(fileName: string): Observable<Blob> {
    return this.http.get(`http://localhost:8080/get-photo/${fileName}`, {
      responseType: 'blob'
    });
  }

  getUserPhotos(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/get-user-photos/${userId}`);
  }

  getPurchasedPhotosByUser(userId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`http://localhost:8080/get-purchased-photos/${userId}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`http://localhost:8080/categories`);
  }

  buyPhoto(userId: number, photoId: number): Observable<any> {
    const body: BuyPhotoRequestDto = { userId, photoId };
    return this.http.post('http://localhost:8080/buy-photo', body);
  }
}
