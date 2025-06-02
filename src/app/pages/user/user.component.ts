import {Component, OnInit} from '@angular/core';
import {response} from 'express';
import {blob} from 'node:stream/consumers';
import {PhotoService} from '../../services/photo.service';
import {jwtDecode} from 'jwt-decode';
import {Subscription} from 'rxjs';
import {MatCard, MatCardActions, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Photo} from '../../models/photo.model';
import {TokenPayload} from '../../models/tokenPayload.model';

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
    NgForOf,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  token: string | null;
  subscription: Subscription = new Subscription();
  photos: Photo[] = [];
  purchasedPhotos: Photo[] = [];

  constructor(private photoService: PhotoService) {
    this.token = "";
  }

  ngOnInit() {
    this.token = localStorage.getItem('jwtToken');
    if (this.token) {
      // console.log("token", this.token);
      const decoded = jwtDecode<TokenPayload>(this.token);
      this.subscription.add(
        this.photoService.getUserPhotos(decoded.userId).subscribe(response => {
          this.photos = response;
          this.photos.forEach(photo => {
            this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
              photo.imageUrl = URL.createObjectURL(blob);
            });
          });
        })
      );
      this.subscription.add(
        this.photoService.getPurchasedPhotosByUser(decoded.userId).subscribe(response => {
          console.log(response)
          this.purchasedPhotos = response;
          this.purchasedPhotos.forEach(photo => {
            this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
              photo.imageUrl = URL.createObjectURL(blob);
            });
          });
        })
      );
    }
  }
}
