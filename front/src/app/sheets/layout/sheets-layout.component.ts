import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SheetsService } from '@app/_services/sheets.service';

@Component({ templateUrl: 'sheets-layout.component.html' })
export class SheetLayoutComponent { 
    constructor(
        private router: Router,
        private sheetsService: SheetsService
    ) {
        // redirect to home if already logged in
        if (this.sheetsService.sheetValue) {
            this.router.navigate(['/']);
        }
    }
}