import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { ModalComponent } from '@shared/components/modals/modal/modal.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { InputComponent } from '@shared/components/inputs/input/input.component';
import { SkeletonComponent } from '@shared/components/loading/skeleton/skeleton.component';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { NotificationService } from '@core/services/notification.service';
import { formatCurrency } from '@core/utils/format.util';
import { bankLabel } from '@core/models/catalogs';
import { EmployeesService } from '@features/employees/data/employees.service';
import { Employee } from '@features/employees/models/employee.models';

interface Line {
  employee: Employee;
  selected: boolean;
  amount: number | null;
  concept: string;
}

@Component({
  selector: 'app-payroll-wizard',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, ModalComponent, ButtonComponent,
    InputComponent, SkeletonComponent
  ],
  templateUrl: './payroll-wizard.component.html',
  styleUrls: ['./payroll-wizard.component.scss']
})
export class PayrollWizardComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @Output() completed = new EventEmitter<string>();

  private readonly fb = inject(FormBuilder);
  private readonly batches = inject(PaymentBatchesService);
  private readonly employeesService = inject(EmployeesService);
  private readonly notify = inject(NotificationService);

  readonly formatCurrency = formatCurrency;
  readonly bankLabel = bankLabel;

  step: 1 | 2 | 3 = 1;
  isWorking = false;
  batchId: string | null = null;

  detailsForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    period: [this.currentPeriod(), [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]]
  });

  lines: Line[] = [];
  loadingEmployees = false;

  get modalTitle(): string {
    return { 1: 'Nueva planilla · Datos', 2: 'Nueva planilla · Empleados', 3: 'Nueva planilla · Revisión' }[this.step];
  }

  get selectedLines(): Line[] {
    return this.lines.filter(l => l.selected && (l.amount ?? 0) > 0);
  }

  get total(): number {
    return this.selectedLines.reduce((sum, l) => sum + (l.amount ?? 0), 0);
  }

  ngOnInit(): void {
    // employees are loaded when entering step 2
  }

  next(): void {
    if (this.step === 1) this.createBatch();
    else if (this.step === 2) this.addItems();
    else this.submit();
  }

  back(): void {
    if (this.step === 3) this.step = 2;
    else if (this.step === 2) this.step = 1;
  }

  private createBatch(): void {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      return;
    }
    // Reuse the draft if the user went back and forth.
    if (this.batchId) {
      this.step = 2;
      this.loadEmployees();
      return;
    }
    this.isWorking = true;
    const { name, period } = this.detailsForm.getRawValue();
    this.batches.create({ name, batchKind: 'Payroll', period }).subscribe({
      next: id => {
        this.batchId = id;
        this.isWorking = false;
        this.step = 2;
        this.loadEmployees();
      },
      error: () => (this.isWorking = false)
    });
  }

  private loadEmployees(): void {
    if (this.lines.length) return;
    this.loadingEmployees = true;
    this.employeesService.list({ onlyActive: true }).subscribe({
      next: rows => {
        this.lines = rows.map(e => ({ employee: e, selected: false, amount: null, concept: 'Pago de planilla' }));
        this.loadingEmployees = false;
      },
      error: () => (this.loadingEmployees = false)
    });
  }

  private addItems(): void {
    if (!this.batchId || !this.selectedLines.length) {
      this.notify.warning('Selecciona al menos un empleado con monto.');
      return;
    }
    const currencies = new Set(this.selectedLines.map(l => l.employee.currencyId));
    if (currencies.size > 1) {
      this.notify.error('Todos los empleados de una planilla deben usar la misma moneda.');
      return;
    }

    this.isWorking = true;
    const calls = this.selectedLines.map(l =>
      this.batches.addItem({
        paymentBatchId: this.batchId!,
        payeeType: 'Employee',
        employeeId: l.employee.id,
        amount: l.amount!,
        currencyId: l.employee.currencyId,
        concept: l.concept?.trim() || 'Pago de planilla'
      })
    );
    forkJoin(calls.length ? calls : [of(null)]).subscribe({
      next: () => {
        this.isWorking = false;
        this.step = 3;
      },
      error: () => (this.isWorking = false)
    });
  }

  private submit(): void {
    if (!this.batchId) return;
    this.isWorking = true;
    this.batches.submit(this.batchId).subscribe({
      next: () => {
        this.notify.success('Planilla enviada a aprobación.');
        this.completed.emit(this.batchId!);
      },
      error: () => (this.isWorking = false)
    });
  }

  private currentPeriod(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }
}
