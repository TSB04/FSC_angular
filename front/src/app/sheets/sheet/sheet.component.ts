import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SheetsService, AlertService } from '@app/_services';
import { Sheet } from '@app/_models';

@Component({ templateUrl: 'sheet.component.html' , styleUrls: ['./sheet.component.less']})
export class SheetComponent implements OnInit {
    sheet!: Sheet | any;

    constructor(
        private router: Router,
        private sheetsService: SheetsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        const ine = this.router.url.split('/')[2];
        this.sheetsService.getById(ine).pipe(first()).subscribe(sheet => {
            this.sheet = sheet;
        });
    }
}