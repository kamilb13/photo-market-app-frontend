import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isPublic = req.url.includes('/auth/google');
    if (!isPublic && typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      // console.log(token);
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          if (this.router.url !== '/login') {
            alert('Brak dostępu! Zaloguj się.');
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
