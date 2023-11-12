import { Component, OnInit } from '@angular/core';
import { first, filter, map } from 'rxjs/operators';

import { SheetsService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  sheets?: any[];

  constructor(private sheetsService: SheetsService, private router: Router) {}
  ngOnInit() {
    this.sheetsService
      .getAll()
      .pipe(first())
      .subscribe((res: any) => {
        if (this.router.url === '/sheets/mysheets') {
          const loggedUser = JSON.parse(localStorage.getItem('user')!);
          const mySheets = res.results.filter((x: any) => x.owner.includes(loggedUser.id));
          console.log(mySheets);
          return (this.sheets = mySheets);
        } else {
          return (this.sheets = res.results);
        }
      });
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