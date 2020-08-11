import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './../admin/shared/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setParams: { auth: this.authService.token },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('[Interceptor Error]: ', error);

        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: { authFailed: true },
          });
        }

        return throwError(error);
      })
    );
  }
}
