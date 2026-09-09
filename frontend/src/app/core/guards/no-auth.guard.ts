import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';

export const noAuthGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  if (session.isAuthenticated()) {
    return inject(Router).parseUrl('/dashboard');
  }
  return true;
};
