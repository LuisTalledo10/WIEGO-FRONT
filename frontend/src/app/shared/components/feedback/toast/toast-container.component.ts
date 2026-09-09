import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-stack" role="status" aria-live="polite">
      <div *ngFor="let t of notify.toasts()" class="toast" [ngClass]="'toast--' + t.kind">
        <span class="toast__dot"></span>
        <p class="toast__msg">{{ t.message }}</p>
        <button class="toast__close" (click)="notify.dismiss(t.id)" aria-label="Cerrar">✕</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      top: var(--space-6);
      right: var(--space-6);
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      max-width: 380px;
      width: calc(100vw - var(--space-8));
    }
    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      padding: var(--space-4);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-lg);
      animation: toastIn var(--duration-normal) ease-out;
    }
    .toast__dot {
      width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0;
    }
    .toast__msg {
      flex: 1;
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      line-height: 1.4;
    }
    .toast__close {
      background: transparent; border: none; cursor: pointer;
      color: var(--color-text-tertiary); font-size: 12px; padding: 2px;
    }
    .toast--success { border-left: 3px solid var(--color-success); }
    .toast--success .toast__dot { background: var(--color-success); }
    .toast--error { border-left: 3px solid var(--color-error); }
    .toast--error .toast__dot { background: var(--color-error); }
    .toast--warning { border-left: 3px solid var(--color-warning); }
    .toast--warning .toast__dot { background: var(--color-warning); }
    .toast--info { border-left: 3px solid var(--color-info); }
    .toast--info .toast__dot { background: var(--color-info); }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(16px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class ToastContainerComponent {
  readonly notify = inject(NotificationService);
}
