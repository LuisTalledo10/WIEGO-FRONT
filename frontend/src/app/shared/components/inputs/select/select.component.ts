import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Selecciona una opción';
  @Input() hint = '';
  @Input() options: SelectOption[] = [];

  value: string | number | null = null;
  isDisabled = false;

  onChange: (val: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get isInvalid(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  }

  get errorMessage(): string {
    return this.ngControl?.errors?.['required'] ? 'Este campo es requerido' : '';
  }

  writeValue(value: string | number | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (val: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChange(event: Event): void {
    const raw = (event.target as HTMLSelectElement).value;
    const match = this.options.find(o => String(o.value) === raw);
    this.value = match ? match.value : raw;
    this.onChange(this.value);
  }
}
