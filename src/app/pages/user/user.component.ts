import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {jwtDecode} from 'jwt-decode';
import {Observable, Subscription} from 'rxjs';
import {MatCard, MatCardActions, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Photo} from '../../models/photo.model';
import {TokenPayload} from '../../models/tokenPayload.model';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {selectUser} from '../../store/auth.selector';
import {LoggedUser} from '../../models/loggedUser.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  token: string | null;
  subscription: Subscription = new Subscription();
  photos: Photo[] = [];
  purchasedPhotos: Photo[] = [];
  currentUser: User | null = null;
  user$: Observable<LoggedUser | null>;

  constructor(private photoService: PhotoService, private authService: AuthService, private store: Store) {
    this.token = "";
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => console.log('User in store:', user));

    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        // console.log('Aktualny user (z observable):', this.currentUser);
        if (this.currentUser) {
          const token = localStorage.getItem('jwtToken');
          if (token) {
            const decoded = jwtDecode<TokenPayload>(token);
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
      })
    );
  }
}
