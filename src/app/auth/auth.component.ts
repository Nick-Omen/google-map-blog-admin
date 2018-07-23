import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  formErrors: string[];

  constructor(private auth: AuthService) {
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
        this.auth.saveCredentials(d);
      });
  }

  handleError(res: any): never {
    if (res.error && res.error['non_field_errors']) {
      this.formErrors = res.error['non_field_errors'];
    }
    return throwError('Authentication credentials are invalid.');
  }
}
