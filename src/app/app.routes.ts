import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MarketPlaceComponent} from './pages/market-place/market-place.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'marketplace', component: MarketPlaceComponent }
];
