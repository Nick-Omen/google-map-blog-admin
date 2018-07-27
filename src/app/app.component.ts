import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {
  ConfirmDialogComponent,
  ConfirmDialogDataModel
} from './components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog,
              private auth: AuthService) {
    auth.validateToken();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to log out?'
      }
    } as MatDialogConfig<ConfirmDialogDataModel>);

    dialog.afterClosed()
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.auth.logout();
        }
      });
  }
}
