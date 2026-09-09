import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="page-header">
      <div class="page-header__text">
        <h1 class="page-header__title">{{ title }}</h1>
        <p class="page-header__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
      </div>
      <div class="page-header__actions">
        <ng-content></ng-content>
      </div>
    </header>
  `,
  styles: [`
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-4);
      flex-wrap: wrap;
      margin-bottom: var(--space-6);
    }
    .page-header__title {
      font-size: var(--font-size-2xl);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-1);
    }
    .page-header__subtitle {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      max-width: 60ch;
    }
    .page-header__actions {
      display: flex;
      gap: var(--space-3);
      flex-shrink: 0;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
