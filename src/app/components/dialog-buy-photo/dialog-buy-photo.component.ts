import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {jwtDecode} from 'jwt-decode';
import {Subscription} from 'rxjs';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../models/photo.model';
import {TokenPayload} from '../../models/tokenPayload.model';
import {PaymentComponent} from '../../pages/payment/payment.component';

@Component({
  selector: 'app-dialog-buy-photo',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    PaymentComponent
  ],
  templateUrl: './dialog-buy-photo.component.html',
  styleUrl: './dialog-buy-photo.component.scss'
})
export class DialogBuyPhotoComponent {
  token: string | null;
  purchasedPhotos: Photo[] = [];
  productId: number = 0;
  photoName: string = '';
  photoPrice: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private photoService: PhotoService) {
    this.token = "";
    // console.log(this.data)
    this.productId = this.data.id;
    this.photoName = this.data.title;
    this.photoPrice = this.data.amount;
    //this.buyPhotoByUser(this.data.id)
  }

  buyPhoto() {
    //TODO purchase logic
    //console.log("Kupiłeś zdjęcie: " + this.data.id);
    //window.location.reload(); //TODO ????
  }

  // buyPhotoByUser(photoId: number) {
  //   this.token = localStorage.getItem('jwtToken');
  //   if (!this.token) {
  //     console.error('User not authenticated!');
  //     return;
  //   }
  //   const decoded = jwtDecode<TokenPayload>(this.token);
  //   const userId = decoded.userId;
  //   this.photoService.buyPhoto(userId, photoId).subscribe({
  //     next: () => {
  //       console.log('Photo purchased successfully');
  //       this.loadPurchasedPhotos(userId);
  //     },
  //     error: err => {
  //       console.error('Failed to buy photo:', err);
  //     }
  //   });
  // }
  //
  // loadPurchasedPhotos(userId: number) {
  //   this.photoService.getPurchasedPhotosByUser(userId).subscribe(response => {
  //     this.purchasedPhotos = response;
  //     this.purchasedPhotos.forEach(photo => {
  //       this.photoService.getPhotoDetails(photo.file_path).subscribe(blob => {
  //         photo.imageUrl = URL.createObjectURL(blob);
  //       });
  //     });
  //   });
  // }
}
