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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  buyPhoto() {
    //TODO purchase logic
    console.log("Kupiłeś zdjęcie" + this.data.title);
  }
}
