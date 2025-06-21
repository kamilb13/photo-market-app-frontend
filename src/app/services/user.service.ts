import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getFullUsernameByEmail(email: string): Observable<{ username: string }> {
    return this.http.post<{ username: string }>(
      `${this.apiUrl}/username`,
      {email: email},
    );
  }

  getFullUsernameById(id: number): Observable<{ username: string }> {
    return this.http.post<{ username: string }> (
      `${this.apiUrl}/username/${id}`,
      {id: id}
    );
  }
}
