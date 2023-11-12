import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSheetsComponent } from './create/sheets-create.component';
import { SheetLayoutComponent } from './layout/sheets-layout.component';
import { ListComponent } from './list/list.component';
import { SheetComponent } from './sheet/sheet.component';

const routes: Routes = [
  {
    path: '',
    component: SheetLayoutComponent,

    children: [
      {path: 'create', component: CreateSheetsComponent},
      { path: 'edit/:ine', component: CreateSheetsComponent },

      {path: 'list', component: ListComponent},
      {path: 'mysheets', component: ListComponent},
      {path: ':ine', component: SheetComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SheetsRoutingModule {}
