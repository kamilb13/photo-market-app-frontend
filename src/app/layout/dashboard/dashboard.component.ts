import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    RouterOutlet,
    NavbarComponent,
    MatDrawer,
    MatNavList,
    MatIcon,
    RouterLink,
    MatListItem,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
