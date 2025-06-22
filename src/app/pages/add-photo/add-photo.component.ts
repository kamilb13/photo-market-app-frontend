import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {jwtDecode} from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {TokenPayload} from '../../models/tokenPayload.model';
import {Router} from '@angular/router';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {map, Observable, startWith} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-add-photo',
  imports: [
    MatCard,
    MatButton,
    NgIf,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.scss'
})
export class AddPhotoComponent implements OnInit {
  form = {
    title: '',
    description: '',
    amount: null,
    category: null,
    userId: null
  };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  user: string;
  token: string | null;
  categories: any[] = [];
  filteredCategories: Observable<string[]> | undefined;

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {
    this.token = "";
    this.user = "";
  }

  categoryControl = new FormControl();

  ngOnInit() {
    this.http.get<string[]>('http://localhost:8080/categories').subscribe(data => {
      this.categories = data;

      this.filteredCategories = this.categoryControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCategory(value || ''))
      )
    })

    this.categoryControl.valueChanges.subscribe(value => {
      this.form.category = value;
    })
  }

  _filterCategory(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  upload() {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token');
      this.token = localStorage.getItem("jwtToken");
      if (this.token) {
        const decoded = jwtDecode<TokenPayload>(this.token);
        if (!this.selectedFile) return;
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('description', this.form.description);
        formData.append('amount', String(this.form.amount));
        formData.append('category', String(this.form.category))
        formData.append('userId', String(decoded.userId));
        formData.append('file', this.selectedFile, this.selectedFile.name);
        // for (let pair of formData.entries()) {
        //   console.log(pair[0]+ ':', pair[1]);
        // }
        this.http.post('http://localhost:8080/add-photo', formData).subscribe();
        alert("Dodano zdjęcie")
        this.router.navigate(['/marketplace']);
      }
    }
  }
}
