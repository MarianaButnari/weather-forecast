import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'forecast/:zipcode',
    loadComponent: () => import('./components/forecast/forecast.component').then(m => m.ForecastComponent)
  }
];
