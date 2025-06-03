import {Component, OnInit} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {TokenPayload} from '../../models/tokenPayload.model';
import {ActivatedRoute} from '@angular/router';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../models/photo.model';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
  token: string | null = null;
  purchasedPhotos: Photo[] = [];

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idPhoto = Number(params['idPhoto']);
      // console.log('idPhoto po płatności:', idPhoto);
      if (idPhoto) {
        this.buyPhotoByUser(idPhoto);
      }
    });
  }

  buyPhotoByUser(photoId: number) {
    this.token = localStorage.getItem('jwtToken');
    if (!this.token) {
      console.error('User not authenticated!');
      return;
    }
    const decoded = jwtDecode<TokenPayload>(this.token);
    const userId = decoded.userId;
    this.photoService.buyPhoto(userId, photoId).subscribe({
      next: () => {
        console.log('Photo purchased successfully');
        this.loadPurchasedPhotos(userId);
      },
      error: err => {
        console.error('Failed to buy photo:', err);
      }
    });
  }

  loadPurchasedPhotos(userId: number) {
    this.photoService.getPurchasedPhotosByUser(userId).subscribe(response => {
      this.purchasedPhotos = response;
      this.purchasedPhotos.forEach(photo => {
        this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
          photo.imageUrl = URL.createObjectURL(blob);
        });
      });
    });
  }
}
