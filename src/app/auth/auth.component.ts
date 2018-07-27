import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginResponseModel } from './auth.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    remember_me: new FormControl()
  });
  formErrors: string[];

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(e: Event) {
    e.preventDefault();

    this.auth.login(this.authForm.value)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(d => {
        if (this.authForm.value.remember_me) {
          this.auth.enableRemember();
        }
        this.auth.saveCredentials(d as LoginResponseModel);
        this.router.navigate(['/']);
      });
  }

  handleError(res: any): any {
    if (res.error && res.error['non_field_errors']) {
      this.formErrors = res.error['non_field_errors'];
    }
    return throwError('Authentication error.');
  }
}
