import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/controller/services/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.loginService.logout();
        this.router.navigate(['/login']);
      }
      return throwError(err);
    }));
  }
}
