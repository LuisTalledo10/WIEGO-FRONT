import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessionService } from '@core/services/session.service';
import { NotificationService } from '@core/services/notification.service';
import { problemMessage } from '@core/models/api.models';

/**
 * Centralises HTTP error handling: shows a toast and, on 401, ends the session.
 * The error is re-thrown so components can still react (e.g. stop a spinner).
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const session = inject(SessionService);
  const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          notify.error('No se pudo conectar con el servidor.');
          break;
        case 401:
          session.logout();
          notify.warning('Tu sesión expiró. Inicia sesión nuevamente.');
          router.navigate(['/login']);
          break;
        case 403:
          notify.error('No tienes permisos para realizar esta acción.');
          break;
        case 400:
        case 404:
        case 409:
        case 422:
          notify.error(problemMessage(error, 'La solicitud no pudo procesarse.'));
          break;
        default:
          if (error.status >= 500) {
            notify.error('Error del servidor. Inténtalo de nuevo en unos minutos.');
          }
      }
      return throwError(() => error);
    })
  );
};
