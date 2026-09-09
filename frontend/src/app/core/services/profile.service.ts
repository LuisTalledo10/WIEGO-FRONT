import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface UserProfile {
  id: string;
  userName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly api = inject(ApiService);

  /** GET api/User/{id} — used to fill the session name/email after login. */
  getById(userId: string): Observable<UserProfile> {
    return this.api.get<UserProfile>(`api/User/${userId}`);
  }
}
