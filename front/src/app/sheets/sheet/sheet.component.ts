import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { SheetsService, AlertService } from '@app/_services';
import { Sheet } from '@app/_models';

@Component({
  templateUrl: 'sheet.component.html',
  styleUrls: ['./sheet.component.less'],
})
export class SheetComponent implements OnInit {
  sheet!: Sheet | any;
  loading = false;
  ine!: any;

  constructor(
    private router: Router,
    private sheetsService: SheetsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.ine = this.router.url.split('/')[2];
    this.sheetsService
      .getById(this.ine)
      .pipe(first())
      .subscribe((sheet) => {
        this.sheet = sheet;
      });
  }

  deleteSheet(ine: string) {
    if (this.ine === ine) {
      this.sheetsService
        .delete(ine)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/sheets/list']);
        });
    }
  }
}
