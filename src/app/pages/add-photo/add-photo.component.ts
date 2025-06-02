import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {jwtDecode} from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {TokenPayload} from '../../models/tokenPayload.model';

@Component({
  selector: 'app-add-photo',
  imports: [
    MatCard,
    MatButton,
    NgIf,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.scss'
})
export class AddPhotoComponent {
  form = {
    title: '',
    description: '',
    amount: null,
    userId: null
  };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  user: string;
  token: string | null;

  constructor(private http: HttpClient, private userService: UserService) {
    this.token = "";
    this.user = "";
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  upload() {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token');
      this.token = localStorage.getItem("jwtToken");
      if (this.token) {
        const decoded = jwtDecode<TokenPayload>(this.token);
        if (!this.selectedFile) return;
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('description', this.form.description);
        formData.append('amount', String(this.form.amount));
        formData.append('userId', String(decoded.userId));
        formData.append('file', this.selectedFile, this.selectedFile.name);
        for (let pair of formData.entries()) {
          console.log(pair[0]+ ':', pair[1]);
        }
        this.http.post('http://localhost:8080/add-photo', formData).subscribe();
      }
    }
  }
}
