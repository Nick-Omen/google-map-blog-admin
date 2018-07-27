import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { placesRoutes } from './places/places.routes';
import { IsNotAuthenticated, IsAuthenticatedChild } from './app.guards';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Routes = [
  {
    path: '',
    canActivateChild: [IsAuthenticatedChild],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      ...placesRoutes
    ]
  },
  {
    path: 'login',
    canActivate: [IsNotAuthenticated],
    component: AuthComponent
  }
];
