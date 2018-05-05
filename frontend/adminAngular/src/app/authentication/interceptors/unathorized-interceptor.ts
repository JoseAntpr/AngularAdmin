import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthGoogleService } from '../services/auth-google.service';

@Injectable()
export class UnathorizedInterceptor implements HttpInterceptor {

    constructor(public router: Router,
                public authService: AuthGoogleService,
                public snackBar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
        },
        (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    localStorage.removeItem('currentUser');
                    this.authService.signOut();
                    this.snackBar.open(`Your session has expired ... Pls login again`, 'Close', {duration: 2000});
                    this.router.navigate(['/login']);
                } else if (err.status === 404) {
                    this.snackBar.open(`Page not found. ERROR 404`, 'Close', {duration: 2000});
                    this.router.navigate(['/home']);
                }
            }
        });
    }
}
