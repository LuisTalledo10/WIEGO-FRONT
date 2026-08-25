import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modals/modal/modal.component';
import { StepUploadEmployeesComponent } from './step-upload-employees/step-upload-employees.component';
import { StepValidateComponent } from './step-validate/step-validate.component';
import { StepScheduleComponent } from './step-schedule/step-schedule.component';

export type PayrollStep = 'upload' | 'validate' | 'schedule';

@Component({
  selector: 'app-payroll-wizard',
  standalone: true,
  imports: [CommonModule, ModalComponent, StepUploadEmployeesComponent, StepValidateComponent, StepScheduleComponent],
  templateUrl: './payroll-wizard.component.html',
  styleUrls: ['./payroll-wizard.component.scss']
})
export class PayrollWizardComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();

  currentStep: PayrollStep = 'upload';
  selectedFile: File | null = null;

  get modalTitle(): string {
    switch(this.currentStep) {
      case 'upload': return 'Paso 1: Carga de empleados';
      case 'validate': return 'Paso 2: Validación de saldos';
      case 'schedule': return 'Paso 3: Programación de pago';
      default: return 'Nueva Nómina';
    }
  }

  get modalSize(): 'sm' | 'md' | 'lg' | 'xl' {
    return this.currentStep === 'validate' ? 'lg' : 'md';
  }

  handleFileSelected(file: File) {
    this.selectedFile = file;
    this.currentStep = 'validate';
  }

  handleValidateNext() {
    this.currentStep = 'schedule';
  }

  handleValidateBack() {
    this.currentStep = 'upload';
  }

  handleScheduleBack() {
    this.currentStep = 'validate';
  }

  handleScheduleSuccess() {
    this.completed.emit();
  }
}
