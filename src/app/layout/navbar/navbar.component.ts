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
    MatAnchor
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  user: string;
  token: string | null;

  constructor(private router: Router, private userService: UserService) {
    this.user = "";
    this.token = "";
  }

  ngOnInit() {
    this.token = localStorage.getItem("jwtToken");
    if (this.token) {
      const decoded = jwtDecode<TokenPayload>(this.token);
      this.userService.getFullUsername(decoded.sub).subscribe({
        next: (response: { username: string }) => {
          this.user = response.username;
        },
        error: (err) => {
          console.error('Błąd podczas pobierania username:', err);
        }
      });
    }
  }
}
