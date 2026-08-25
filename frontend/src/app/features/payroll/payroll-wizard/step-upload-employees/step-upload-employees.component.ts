import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';

@Component({
  selector: 'app-step-upload-employees',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './step-upload-employees.component.html',
  styleUrls: ['./step-upload-employees.component.scss']
})
export class StepUploadEmployeesComponent {
  @Output() fileSelected = new EventEmitter<File>();
  selectedFile: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onContinue() {
    if (this.selectedFile) {
      this.fileSelected.emit(this.selectedFile);
    }
  }
}
