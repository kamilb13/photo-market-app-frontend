import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {NgIf} from '@angular/common';
import {User} from '../../models/user.model';
import {Observable, Subscription} from 'rxjs';
import {selectUser} from '../../store/auth.selector';
import {Store} from '@ngrx/store';
import {LoggedUser} from '../../models/loggedUser.model';

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
  currentUser: User | null = null;
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
    this.user = "";
    this.token = "";
  }

  ngOnInit() {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
          this.currentUser = user;
        }
      )
    )
  }

  onLogout() {
    this.authService.logout()
  }

  get canLogout(): boolean {
    //console.log(this.authservice.isLoggedIn())
    return this.authService.isLoggedIn();
  }

}
