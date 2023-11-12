import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const token = JSON.parse(localStorage.getItem('user') || '{}');
        const accessToken = token.access;
        const decodedToken = jwtDecode(accessToken);
        // localStorage.setItem('userInfo', JSON.stringify(decodedToken));

        const isLoggedIn = user && token && token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token?.access}`
                }
            });
        }

        return next.handle(request);
    }
}