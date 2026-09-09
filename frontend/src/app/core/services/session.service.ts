import { Injectable, computed, signal } from '@angular/core';
import { RoleId } from '@core/models/enums';
import { decodeJwt, isExpired, JwtClaims } from '@core/utils/jwt.util';

const TOKEN_KEY = 'wiego_token';
const PROFILE_KEY = 'wiego_profile';

export interface SessionUser {
  userId: string;
  companyId: string;
  roleId: number;
  name: string;
  email: string;
}

interface StoredProfile {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly _token = signal<string | null>(this.readToken());
  private readonly _profile = signal<StoredProfile | null>(this.readProfile());

  readonly token = this._token.asReadonly();

  readonly claims = computed<JwtClaims | null>(() => {
    const t = this._token();
    return t ? decodeJwt(t) : null;
  });

  readonly user = computed<SessionUser | null>(() => {
    const c = this.claims();
    if (!c) return null;
    const p = this._profile();
    return {
      userId: c.sub,
      companyId: c.companyId,
      roleId: c.roleId,
      name: p?.name || '',
      email: p?.email || ''
    };
  });

  readonly isAuthenticated = computed<boolean>(() => {
    const c = this.claims();
    return !!c && !isExpired(c);
  });

  login(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
  }

  setProfile(profile: StoredProfile): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    this._profile.set(profile);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    this._token.set(null);
    this._profile.set(null);
  }

  hasRole(...roles: RoleId[]): boolean {
    const r = this.user()?.roleId;
    return r != null && roles.includes(r);
  }

  private readToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  private readProfile(): StoredProfile | null {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      return raw ? (JSON.parse(raw) as StoredProfile) : null;
    } catch {
      return null;
    }
  }
}
