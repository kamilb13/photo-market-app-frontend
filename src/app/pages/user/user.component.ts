import {Component, OnInit} from '@angular/core';
import {response} from 'express';
import {blob} from 'node:stream/consumers';
import {PhotoService} from '../../services/photo.service';
import {jwtDecode} from 'jwt-decode';
import {Subscription} from 'rxjs';
import {MatCard, MatCardActions, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';

interface TokenPayload {
  sub: string;
  exp: number;
  userId: number;
}

export interface Photo {
  id: number;
  title: string;
  description: string;
  amount: number;
  file_path: any;
  uploadDate: string;
  userId: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  token: string | null;
  subscription: Subscription = new Subscription();
  photos: Photo[] = [];

  constructor(private photoService: PhotoService) {
    this.token = "";
  }

  ngOnInit() {
    this.token = localStorage.getItem('jwtToken');
    if (this.token) {
      const decoded = jwtDecode<TokenPayload>(this.token);
      this.subscription = this.photoService.getUserPhotos(decoded.userId).subscribe(response => {
        this.photos = response;
        this.photos.forEach((photo) => {
          this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
            console.log(photo);
            photo.imageUrl = URL.createObjectURL(blob);
          });
        });
      });
    }
  }
}
