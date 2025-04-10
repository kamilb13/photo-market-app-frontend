import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-dialog-buy-photo',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './dialog-buy-photo.component.html',
  styleUrl: './dialog-buy-photo.component.scss'
})
export class DialogBuyPhotoComponent {

}
