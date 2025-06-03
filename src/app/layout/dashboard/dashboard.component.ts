import { Component } from '@angular/core';
import {MatDrawerContainer} from '@angular/material/sidenav';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatDrawerContainer,
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
