import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { token } from '@app/_models/token';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    // login(username: string, password: string) {
    //     return this.http.post<User>(`${environment.apiUrl}/auth/`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //             this.userSubject.next(user);
    //             return user;
    //         }));
    // }


    login(username: string, password: string) {
        return this.http.post<token>(`${environment.apiUrl}/auth/`, { username, password })
            .pipe(map(token => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access', JSON.stringify(token.access));
                localStorage.setItem('refresh', JSON.stringify(token.refresh));
                const accessToken = JSON.parse(localStorage.getItem('access') || '{}');
                const userInfo: any = jwtDecode(accessToken);
                const user = {
                    id: userInfo.user_id || '',
                    username: userInfo.username || '',
                    firstName: userInfo.first_name || '',
                    lastName: userInfo.last_name || '',
                    token: token.access
                };
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}/`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}/`, params)
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}/`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}