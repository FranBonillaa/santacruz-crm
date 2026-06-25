import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PrivacyComponent } from './pages/privacy/privacy';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
];
