import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Photo {
  id: number;
  title: string;
  description: string;
  amount: number;
  filePath: string;
  uploadDate: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  private apiUrl: string = 'http://localhost:8080/get-photos';

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
