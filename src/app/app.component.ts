import {Component, OnInit} from '@angular/core';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'photo-market-app-frontend';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadUserFromToken();
  }
}
