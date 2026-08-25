import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Redirect to unauthorized or dashboard
        // router.navigate(['/unauthorized']); 
      }
      
      // Later this will be integrated with NotificationService
      return throwError(() => error);
    })
  );
};
