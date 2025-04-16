import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MarketPlaceComponent} from './pages/market-place/market-place.component';
import {AddPhotoComponent} from './pages/add-photo/add-photo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'marketplace', component: MarketPlaceComponent },
  { path: 'photo', component: AddPhotoComponent }
];
