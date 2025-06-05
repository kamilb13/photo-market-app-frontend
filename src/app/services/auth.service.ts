import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import {Router} from '@angular/router';
import {SocialUser} from '@abacritt/angularx-social-login'
import {User} from '../models/user.model';
import {AuthResponse} from '../models/auth.model';

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

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  clearUser() {
    this.currentUserSubject.next(null);
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
          this.backendResponse = response;
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

  loadUserFromToken(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      const userId = decoded.userId;
      if (userId) {
        this.http.post<User>('http://localhost:8080/auth/me?id=' + userId, {}, {
          withCredentials: true
        }).subscribe({
          next: (user) => {
            this.setUser(user);
            console.log('Użytkownik załadowany z tokenu:', user);
          },
          error: (err) => {
            console.error('Błąd podczas ładowania użytkownika z tokenu:', err);
            this.clearUser();
          }
        });
      }
    }
  }

  logout(): void {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    this.loggedInSubject.next(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
