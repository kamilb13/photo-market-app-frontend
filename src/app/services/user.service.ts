import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
export class UserService {

  private apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getFullUsername(email: string): Observable<{ username: string }> {
    return this.http.post<{ username: string }>(
      `${this.apiUrl}/get-username`,
      {email: email},
    );
  }
}
