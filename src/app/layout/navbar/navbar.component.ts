import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {MatListItem, MatNavList} from '@angular/material/list';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {jwtDecode} from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {NgIf} from '@angular/common';

interface TokenPayload {
  sub: string;
  exp: number;
  userId?: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatMenuTrigger,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatAnchor,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  user: string;
  token: string | null;

  constructor(private router: Router, private userService: UserService, private authservice: AuthService) {
    this.user = "";
    this.token = "";
  }

  ngOnInit() {

  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  get canLogout(): boolean {
    //console.log(this.authservice.isLoggedIn())
    return this.authservice.isLoggedIn();
  }

}
