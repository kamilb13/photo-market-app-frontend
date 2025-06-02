import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MarketPlaceComponent} from './pages/market-place/market-place.component';
import {AddPhotoComponent} from './pages/add-photo/add-photo.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {UserComponent} from './pages/user/user.component';
import {AuthGuard} from './auth.guard';
import {SuccessComponent} from './pages/success/success.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'marketplace', component: MarketPlaceComponent, canActivate: [AuthGuard]},
  {path: 'photo', component: AddPhotoComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'success', component: SuccessComponent, canActivate: [AuthGuard]}
];
