import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modals/modal/modal.component';
import { StepUploadComponent } from './step-upload/step-upload.component';
import { StepReviewComponent } from './step-review/step-review.component';
import { StepConfirmComponent } from './step-confirm/step-confirm.component';

export type WizardStep = 'upload' | 'review' | 'confirm';

@Component({
  selector: 'app-dispersion-wizard',
  standalone: true,
  imports: [CommonModule, ModalComponent, StepUploadComponent, StepReviewComponent, StepConfirmComponent],
  templateUrl: './dispersion-wizard.component.html',
  styleUrls: ['./dispersion-wizard.component.scss']
})
export class DispersionWizardComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();

  currentStep: WizardStep = 'upload';
  selectedFile: File | null = null;

  get modalTitle(): string {
    switch(this.currentStep) {
      case 'upload': return 'Paso 1: Sube tu archivo';
      case 'review': return 'Paso 2: Revisión de saldos';
      case 'confirm': return 'Paso 3: Autorización';
      default: return 'Nueva Dispersión';
    }
  }

  get modalSize(): 'sm' | 'md' | 'lg' | 'xl' {
    return this.currentStep === 'review' ? 'lg' : 'md';
  }

  handleFileSelected(file: File) {
    this.selectedFile = file;
    this.currentStep = 'review';
  }

  handleReviewNext() {
    this.currentStep = 'confirm';
  }

  handleReviewBack() {
    this.currentStep = 'upload';
  }

  handleConfirmBack() {
    this.currentStep = 'review';
  }

  handleConfirmSuccess() {
    this.completed.emit();
  }
}
