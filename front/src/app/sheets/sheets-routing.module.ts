import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSheetsComponent } from './create/sheets-create.component';
import { SheetLayoutComponent } from './layout/sheets-layout.component';

const routes: Routes = [
  {
    path: '', component: SheetLayoutComponent,
    children: [{ path: 'create', component: CreateSheetsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SheetsRoutingModule {}
