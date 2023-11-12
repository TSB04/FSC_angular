import {Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SheetsService } from '@app/_services';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.less'] })
export class ListComponent implements OnInit {
    sheets?: any[];
    
    constructor(private sheetsService: SheetsService) {}
    
    ngOnInit() {
        this.sheetsService
        .getAll()
        .pipe(first())
        .subscribe((res: any) => (this.sheets = res.results));
    }
    
    // deleteSheet(id: string) {
    //     const sheet = this.sheets!.find((x) => x.id === id);
    //     sheet.isDeleting = true;
    //     this.sheetsService
    //     .delete(id)
    //     .pipe(first())
    //     .subscribe(() => (this.sheets = this.sheets!.filter((x) => x.id !== id)));
    // }
    }