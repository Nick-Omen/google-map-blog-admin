import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {};
    const authToken = this.auth.getAuthorizationToken();

    if (authToken) {
      headers['Authorization'] = this.auth.getAuthorizationToken();
    }

    request = request.clone({
      url: `${environment.baseUrl}/${request.url}`,
      setHeaders: headers
    });
    return next.handle(request);
      // .pipe(
      //   tap((event: HttpEvent<any>) => {
      //     if (event instanceof HttpResponse) {
      //       console.log('success');
      //       console.log(event);
      //       console.log('------------------------------------------------------------------');
      //     }
      //     return event;
      //   }, (err: any) => {
      //     if (err instanceof HttpErrorResponse) {
      //       console.log('error');
      //       console.error(event);
      //       console.log('------------------------------------------------------------------');
      //     }
      //     return event;
      //   })
      // );
  }
}
