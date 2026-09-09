import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private seq = 0;

  success(message: string): void {
    this.push('success', message);
  }
  error(message: string): void {
    this.push('error', message, 7000);
  }
  warning(message: string): void {
    this.push('warning', message);
  }
  info(message: string): void {
    this.push('info', message);
  }

  dismiss(id: number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  private push(kind: ToastKind, message: string, timeout = 4500): void {
    const id = ++this.seq;
    this._toasts.update(list => [...list, { id, kind, message }]);
    setTimeout(() => this.dismiss(id), timeout);
  }
}
