import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterModule, RouterStateSnapshot,
  Routes
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { IsNotAuthenticated, IsAuthenticatedChild } from './app.guards';

const appRoutes: Routes = [
  {
    path: '',
    canActivateChild: [IsAuthenticatedChild],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'login',
    canActivate: [IsNotAuthenticated],
    component: AuthComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // !environment.production
    )
  ],
  providers: [
    IsNotAuthenticated,
    IsAuthenticatedChild,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
