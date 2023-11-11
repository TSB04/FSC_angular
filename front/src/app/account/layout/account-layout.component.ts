import { Component, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/_services';

@Component({selector: 'account-form', templateUrl: 'account-layout.component.html' })
export class AccountLayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService,
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}