import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {PhotoService} from '../../services/photo.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogBuyPhotoComponent} from '../../components/dialog-buy-photo/dialog-buy-photo.component';

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

  constructor(private photoService: PhotoService) {
  }

  photos: Photo[] = [];
  subscription: Subscription = new Subscription();
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.subscription = this.photoService.getPhotos().subscribe(response => {
      this.photos = response;
      console.log(this.photos);

      this.photos.forEach((photo) => {
        this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
          console.log(photo);
          photo.imageUrl = URL.createObjectURL(blob);
        });
      });
    });
  }

  buyPhoto(photo: any) {
    alert(`Kupiono zdjęcie: ${photo.title} za ${photo.amount} PLN!`);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogBuyPhotoComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
