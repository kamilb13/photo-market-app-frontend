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
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';

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
    FormsModule,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatSelectTrigger,
    MatLabel
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
  category = new FormControl();
  categories: string[] = [];

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
        this.photos.forEach((photo) => {
          this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
            // console.log(photo);
            photo.imageUrl = URL.createObjectURL(blob);
          });
        });
      });
      this.photoService.getCategories().subscribe(categories => {
        this.categories = categories;
      })

    }
  }

  filteredPhotos(): Photo[] {
    const search = this.searchText.toLowerCase();
    const selectedCategories: string[] = this.category.value || [];

    return this.photos.filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(search) ||
        photo.description.toLowerCase().includes(search);

      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(photo.category);

      return matchesSearch && matchesCategory;
    });
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
