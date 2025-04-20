import {Component, OnInit} from '@angular/core';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser
} from '@abacritt/angularx-social-login';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {MatDivider} from '@angular/material/divider';
import {HttpClient} from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
    imports: [
        GoogleSigninButtonModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatDivider,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authServiceOAuth: SocialAuthService,
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, surname, password, email, phoneNumber } = this.registerForm.value;
      this.authService.registerUser(name, surname, password, email, phoneNumber)
        .subscribe({
          next: response => {
            console.log(response);
          },
          error: error => {
            console.log(error);
          }
        });
    } else {
      console.log("Form error!")
    }
  }
}
