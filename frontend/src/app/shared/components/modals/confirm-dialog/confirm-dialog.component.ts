import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent, ButtonVariant } from '../../buttons/button/button.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  template: `
    <app-modal [title]="title" size="sm" (close)="cancel.emit()">
      <p class="confirm-message">{{ message }}</p>
      <div class="confirm-actions">
        <app-button variant="outline" (clicked)="cancel.emit()" [disabled]="loading">
          {{ cancelText }}
        </app-button>
        <app-button [variant]="confirmVariant" [loading]="loading" (clicked)="confirm.emit()">
          {{ confirmText }}
        </app-button>
      </div>
    </app-modal>
  `,
  styles: [`
    .confirm-message {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }
    .confirm-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
      margin-top: var(--space-6);
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Deseas continuar?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() confirmVariant: ButtonVariant = 'primary';
  @Input() loading = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
