import { Component } from '@angular/core';
import {DashboardComponent} from './layout/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'photo-market-app-frontend';
}
