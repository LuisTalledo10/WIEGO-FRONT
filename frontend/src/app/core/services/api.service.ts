import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

type ParamValue = string | number | boolean;

/**
 * Thin wrapper over HttpClient that prefixes environment.apiUrl.
 * Feature services depend on this so the base URL lives in one place.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl.replace(/\/+$/, '');

  get<T>(path: string, params?: Record<string, ParamValue | undefined>): Observable<T> {
    return this.http.get<T>(this.url(path), { params: this.toParams(params) });
  }

  post<T>(path: string, body?: unknown): Observable<T> {
    return this.http.post<T>(this.url(path), body ?? {});
  }

  put<T>(path: string, body?: unknown): Observable<T> {
    return this.http.put<T>(this.url(path), body ?? {});
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.url(path));
  }

  /** For endpoints that return a file (e.g. bank export). */
  download(path: string, body?: unknown): Observable<import('@angular/common/http').HttpResponse<Blob>> {
    return this.http.post(this.url(path), body ?? {}, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  private url(path: string): string {
    return `${this.base}/${path.replace(/^\/+/, '')}`;
  }

  private toParams(params?: Record<string, ParamValue | undefined>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }
    return httpParams;
  }
}
