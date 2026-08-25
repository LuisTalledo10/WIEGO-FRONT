import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<Event>();

  get classes(): string[] {
    return [
      'btn',
      `btn--${this.variant}`,
      `btn--${this.size}`,
      this.fullWidth ? 'btn--full-width' : '',
      this.loading ? 'btn--loading' : ''
    ].filter(Boolean);
  }

  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
