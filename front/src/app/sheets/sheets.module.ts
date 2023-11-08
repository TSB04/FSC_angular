import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SheetsRoutingModule } from './sheets-routing.module';
import { SheetLayoutComponent } from '@app/sheets/layout/sheets-layout.component';
import { CreateSheetsComponent } from './create/sheets-create.component';



@NgModule({
  declarations: [
    SheetLayoutComponent,
    CreateSheetsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SheetsRoutingModule
  ],

})
export class SheetsModule { }
