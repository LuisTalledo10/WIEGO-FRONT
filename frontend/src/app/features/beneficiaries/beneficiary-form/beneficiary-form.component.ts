import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerComponent } from '../../../shared/components/modals/drawer/drawer.component';
import { ButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DrawerComponent, ButtonComponent, InputComponent],
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.scss']
})
export class BeneficiaryFormComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;
  isSaving = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      alias: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      clabe: ['', [Validators.required, Validators.pattern('^[0-9]{18}$')]],
      bank: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSave() {
    if (this.form.valid) {
      this.isSaving = true;
      setTimeout(() => {
        this.isSaving = false;
        this.saved.emit();
      }, 1500);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
