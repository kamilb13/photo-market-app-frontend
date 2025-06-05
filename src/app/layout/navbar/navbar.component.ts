import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
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
    this.router.navigate(['/home']);
  }

  get canLogout(): boolean {
    //console.log(this.authservice.isLoggedIn())
    return this.authservice.isLoggedIn();
  }

}
