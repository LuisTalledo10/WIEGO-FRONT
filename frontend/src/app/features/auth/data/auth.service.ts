import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { SessionService } from '@core/services/session.service';
import { ProfileService } from '@core/services/profile.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  companyName: string;
  userName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly session = inject(SessionService);
  private readonly profile = inject(ProfileService);

  /** Logs in, stores the token, and best-effort loads the user profile. */
  login(request: LoginRequest): Observable<void> {
    return this.api.post<{ token: string }>('Login', request).pipe(
      tap(res => this.session.login(res.token)),
      switchMap(() => this.loadProfile())
    );
  }

  signup(request: SignupRequest): Observable<void> {
    return this.api.post<{ companyId: string }>('Signup', request).pipe(
      switchMap(() => this.login({ email: request.email, password: request.password }))
    );
  }

  private loadProfile(): Observable<void> {
    return new Observable<void>(subscriber => {
      const userId = this.session.user()?.userId;
      if (!userId) {
        subscriber.next();
        subscriber.complete();
        return;
      }
      const sub = this.profile.getById(userId).subscribe({
        next: p => this.session.setProfile({ name: p.userName, email: p.email }),
        error: () => {},
        complete: () => {
          subscriber.next();
          subscriber.complete();
        }
      });
      return () => sub.unsubscribe();
    });
  }
}
