import { Component } from '@angular/core';
import {MyHttpService} from '../../services/MyHttpService';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  url: string = "";

  constructor(private http: MyHttpService) {}

  ngOnInit(): void {
    this.http.get("/auth/url").subscribe((data: any) => this.url = data.authURL);
  }
}
