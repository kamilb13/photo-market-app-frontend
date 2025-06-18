import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {PhotoService} from '../../services/photo.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogBuyPhotoComponent} from '../../components/dialog-buy-photo/dialog-buy-photo.component';
import {jwtDecode} from 'jwt-decode';
import {Photo} from '../../models/photo.model';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';

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
    MatFormField,
    MatInput,
    FormsModule
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
  currentUserId: number | null = null;
  purchasedPhotos: Photo[] = [];
  purchasedPhotoIds = new Set<number>();
  searchText: string = "";

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decoded = jwtDecode<{ userId: number }>(token);
        // console.log(decoded);
        this.currentUserId = decoded.userId;
        this.photoService.getPurchasedPhotosByUser(this.currentUserId).subscribe(purchased => {
          this.purchasedPhotos = purchased;
          this.purchasedPhotoIds = new Set(purchased.map(p => p.id));
        });
      }
      this.subscription = this.photoService.getPhotos().subscribe(response => {
        this.photos = response;
        // console.log(this.photos);
        this.photos.forEach((photo) => {
          this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
            // console.log(photo);
            photo.imageUrl = URL.createObjectURL(blob);
          });
        });
      });
    }
  }

  filteredPhotos(): any {
    if (!this.searchText) {
      return this.photos;
    }

    const lowerSearch = this.searchText.toLowerCase();
    return this.photos.filter(photo =>
      photo.title.toLowerCase().includes(lowerSearch) ||
      photo.description.toLowerCase().includes(lowerSearch)
    )
  }

  isPhotoPurchased(photoId: number): boolean {
    return this.purchasedPhotoIds.has(photoId);
  }

  openDialog(photo: Photo): void {
    this.dialog.open(DialogBuyPhotoComponent, {
      width: '250px',
      data: photo
    });
  }
}
