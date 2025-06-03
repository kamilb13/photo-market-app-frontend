import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import {Router} from '@angular/router';
import {SocialUser} from '@abacritt/angularx-social-login'

interface ResponseBackend {
  jwtToken: string;
  refreshToken: string;
}

interface TokenPayload {
  sub: string;
  exp: number;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendResponse: any = null;
  backendError: any = null;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  loginWithEmail(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    }
    // console.log(loginData);
    this.http.post<ResponseBackend>('http://localhost:8080/auth/login', loginData, {
      withCredentials: true
    })
      .subscribe({
        next: (response) => {
          // console.log('Odpowiedź backendu:', response);
          this.backendResponse = response; // {name: 'Mikołaj', userId: '16', email: 'mikolaj.pacierz.psk@gmail.com'}
          /*

                    .body(response)
            Map<String, String> response = new HashMap<>();
            response.put("email", email);
            response.put("userId", user.getId().toString());
            response.put("name", user.getName());
           */
          if (typeof window !== 'undefined') {
            localStorage.setItem("jwtToken", response.jwtToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            if (response.jwtToken) {
              const decoded = jwtDecode<TokenPayload>(response.jwtToken);
              console.log("Zalogowany użytkownik:", decoded);
            }
          }
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Błąd backendu:', error);
          this.backendError = error;
        }
      });
    return of({success: true});
  }

  loginWithGoogle(socialUser: SocialUser): Observable<any> {
    const idToken = socialUser.idToken;
    return this.http.post<ResponseBackend>('http://localhost:8080/auth/google', { idToken }, {
      withCredentials: true
    }).pipe(tap((response) => {
      this.backendResponse = response;
      if (typeof window !== 'undefined') {
        // console.log(response)
        localStorage.setItem("jwtToken", response.jwtToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        const decoded = jwtDecode<TokenPayload>(response.jwtToken)
        console.log("Zalogowany użytkownik (Google):", decoded);
      }
      this.router.navigate(['/home']);
    }));
  }

  registerUser(name: string, surname: string, password: string, email: string, phoneNumber: string): Observable<any> {
    const registerData = {
      name: name,
      surname: surname,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    }
    // console.log(registerData);
    this.http.post('http://localhost:8080/auth/register', registerData)
      .subscribe({
        next: (response) => {
          console.log('Odpowiedź backendu:', response);
          this.backendResponse = response;
        },
        error: (error) => {
          console.error('Błąd backendu:', error);
          this.backendError = error;
        }
      });
    return of({success: true});
  }

  markLoggedIn(isLogged: boolean): void {
    this.loggedInSubject.next(isLogged);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      let item = localStorage.getItem("jwtToken");
      if (item) {
        return true;
      }
    }
    return false;
  }
}
