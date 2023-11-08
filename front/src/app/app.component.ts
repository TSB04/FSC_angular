import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent implements OnInit {
    user?: User | null;
    sheets: any;

    constructor(private accountService: AccountService, private HttpClient: HttpClient)  {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }

    ngOnInit() {
        this.getSheet();
    }

    getSheet() {
        this.HttpClient.get('http://localhost:8000/sheets/').subscribe((res: any) => {
           this.sheets = res.results; 
           console.log(res);
        });
    }
}