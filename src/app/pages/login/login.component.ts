import {Component, OnInit} from '@angular/core';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser
} from '@abacritt/angularx-social-login';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatAnchor, MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {MatDivider} from '@angular/material/divider';
import {HttpClient} from '@angular/common/http';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface ResponseBackend {
  jwtToken: string;
  refreshToken: string;
}

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    GoogleSigninButtonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatDivider,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser | null = null;
  backendResponse: any = null;
  backendError: any = null;

  loginForm: FormGroup;

  constructor(private authServiceOAuth: SocialAuthService, private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.authServiceOAuth.authState.subscribe((user) => {
      this.user = user;
      if (user && user.idToken) {
        console.log(user.idToken);
        this.authService.loginWithGoogle(user).subscribe({
          next: (response) => {
            this.backendResponse = response;
          },
          error: (error) => {
            console.error('Błąd backendu:', error);
            this.backendError = error;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.loginWithEmail(email, password)
    }
  }

}
