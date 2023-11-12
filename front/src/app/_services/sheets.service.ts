import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Sheet } from '@app/_models';
import { JwtInterceptor } from '@app/_helpers'; 

@Injectable({ providedIn: 'root' })
export class SheetsService {
  private sheetSubject: BehaviorSubject<Sheet | null>;
  public sheet: Observable<Sheet | null>;
  

  constructor(private router: Router, private http: HttpClient) {
    this.sheetSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('sheet')!)
    );
    this.sheet = this.sheetSubject.asObservable();
  }

  public get sheetValue() {
    return this.sheetSubject.value;
  }

  getAll() {
    return this.http.get<Sheet[]>(`${environment.apiUrl}/sheets`);
  }

  // create sheet with token
  create(sheet: Sheet) {
    return this.http.post(`${environment.apiUrl}/sheets/`, sheet, {
      // headers: { Authorization: `Bearer ${token?.access}` },
    });
  }


  getById(ine: string) {
    return this.http.get<Sheet>(`${environment.apiUrl}/sheets/${ine}`);
  }

  
}
