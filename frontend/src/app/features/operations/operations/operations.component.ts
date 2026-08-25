import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Mis Operaciones</h1>
        <p class="page-subtitle">Historial completo de tus transacciones y movimientos.</p>
      </header>

      <div class="empty-state">
        <i class="lucide-activity icon-empty"></i>
        <h3>Módulo en construcción</h3>
        <p>Próximamente podrás visualizar el detalle de todas tus operaciones aquí.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      height: 100%;
    }
    .page-header {
      display: flex;
      flex-direction: column;
    }
    .page-title {
      font-size: var(--font-size-2xl);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-1);
    }
    .page-subtitle {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
    .empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-surface);
      border: 1px dashed var(--color-border-strong);
      border-radius: var(--radius-lg);
      color: var(--color-text-secondary);
      text-align: center;
      padding: var(--space-8);
      
      .icon-empty {
        font-size: 48px;
        color: var(--wiego-indigo);
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }
      
      h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-text-primary);
        margin-bottom: var(--space-2);
      }
    }
  `]
})
export class OperationsComponent {}
