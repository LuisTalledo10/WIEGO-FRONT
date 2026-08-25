import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { InputComponent } from '../../../../shared/components/inputs/input/input.component';

@Component({
  selector: 'app-step-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule, InputComponent],
  templateUrl: './step-schedule.component.html',
  styleUrls: ['./step-schedule.component.scss']
})
export class StepScheduleComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  scheduleForm: FormGroup;
  isProcessing = false;
  paymentType: 'immediate' | 'scheduled' = 'immediate';

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      scheduledDate: ['']
    });
  }

  setPaymentType(type: 'immediate' | 'scheduled') {
    this.paymentType = type;
    if (type === 'immediate') {
      this.scheduleForm.get('scheduledDate')?.clearValidators();
    } else {
      this.scheduleForm.get('scheduledDate')?.setValidators([Validators.required]);
    }
    this.scheduleForm.get('scheduledDate')?.updateValueAndValidity();
  }

  onConfirm() {
    if (this.paymentType === 'scheduled' && this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.confirm.emit();
    }, 1500);
  }
}
