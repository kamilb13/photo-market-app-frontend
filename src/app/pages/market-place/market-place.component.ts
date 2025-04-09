import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {PhotoService} from '../../services/photo.service';
import {Subscription} from 'rxjs';

export interface Photo {
  id: number;
  title: string;
  description: string;
  amount: number;
  filePath: string;
  uploadDate: string;
  userId: number;
}

@Component({
  selector: 'app-market-place',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatCardSubtitle,
    MatCardImage,
    MatButton,
  ],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.scss'
})
export class MarketPlaceComponent implements OnInit {

  constructor(private photoService: PhotoService) {}

  photos: Photo[] = [];
  subscription: Subscription = new Subscription();

  ngOnInit() {
    console.log('ngOnInit');
    this.subscription = this.photoService.getPhotos().subscribe(response => {
      this.photos = response;
      //console.log(response);
      this.photos = response.map(photo => {
        photo.filePath = `http://localhost:8080/uploads/${photo.filePath}`;
        return photo;
      });
    });
  }

  buyPhoto(photo: any) {
    alert(`Kupiono zdjęcie: ${photo.title} za ${photo.price} PLN!`);
  }
}
