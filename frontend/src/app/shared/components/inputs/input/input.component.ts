import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() hint: string = '';
  @Input() readonly: boolean = false;
  @Input() prefixIcon?: string; // Could be extended later with Lucide
  @Input() suffixIcon?: string;

  value: string = '';
  isDisabled: boolean = false;
  
  onChange = (val: string) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get isInvalid(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  }

  get errorMessage(): string {
    if (this.ngControl?.errors) {
      if (this.ngControl.errors['required']) return 'Este campo es requerido';
      if (this.ngControl.errors['email']) return 'Formato de correo inválido';
      if (this.ngControl.errors['minlength']) return `Mínimo ${this.ngControl.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
