import { Component } from '@angular/core';

import { AccountService, SheetsService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'FreeLib';
  user?: User | null;

  constructor(
    private accountService: AccountService,
  ) {
    this.accountService.user.subscribe((x) => (this.user = x));
    console.log(this.user);
  }

  logout() {
    this.accountService.logout();
  }
}
