import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { InputComponent } from '../../../../shared/components/inputs/input/input.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-step-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, LucideAngularModule],
  templateUrl: './step-confirm.component.html',
  styleUrls: ['./step-confirm.component.scss']
})
export class StepConfirmComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  otpForm: FormGroup;
  isProcessing = false;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onConfirm() {
    if (this.otpForm.valid) {
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
        this.confirm.emit();
      }, 1500);
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}
