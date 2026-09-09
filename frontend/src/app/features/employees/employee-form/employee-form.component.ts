import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DrawerComponent } from '@shared/components/modals/drawer/drawer.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { InputComponent } from '@shared/components/inputs/input/input.component';
import { SelectComponent, SelectOption } from '@shared/components/inputs/select/select.component';
import { NotificationService } from '@core/services/notification.service';
import { BANKS, CURRENCIES, DEFAULT_CURRENCY_ID, bankValueFromId } from '@core/models/catalogs';
import { ACCOUNT_TYPE_LABELS, DOCUMENT_TYPE_LABELS } from '@core/models/enums';
import { EmployeesService } from '../data/employees.service';
import { Employee, EmployeeFormValue } from '../models/employee.models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DrawerComponent, ButtonComponent, InputComponent, SelectComponent],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(EmployeesService);
  private readonly notify = inject(NotificationService);

  isSaving = false;

  readonly bankOptions: SelectOption[] = BANKS.map(b => ({ value: b.value, label: b.label }));
  readonly currencyOptions: SelectOption[] = CURRENCIES.map(c => ({ value: c.id, label: c.label }));
  readonly docTypeOptions: SelectOption[] = (Object.keys(DOCUMENT_TYPE_LABELS) as (keyof typeof DOCUMENT_TYPE_LABELS)[])
    .map(k => ({ value: k, label: DOCUMENT_TYPE_LABELS[k] }));
  readonly accountTypeOptions: SelectOption[] = (Object.keys(ACCOUNT_TYPE_LABELS) as (keyof typeof ACCOUNT_TYPE_LABELS)[])
    .map(k => ({ value: k, label: ACCOUNT_TYPE_LABELS[k] }));

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(150)]],
    documentType: ['DNI', [Validators.required]],
    documentNumber: ['', [Validators.required, Validators.maxLength(20)]],
    bank: ['Bcp', [Validators.required]],
    accountType: ['Ahorro', [Validators.required]],
    accountNumber: ['', [Validators.required, Validators.maxLength(50)]],
    cci: ['', [Validators.required, Validators.maxLength(30)]],
    currencyId: [DEFAULT_CURRENCY_ID, [Validators.required]]
  });

  get isEdit(): boolean {
    return !!this.employee;
  }

  ngOnInit(): void {
    if (this.employee) {
      this.form.patchValue({
        fullName: this.employee.fullName,
        documentType: this.employee.documentType,
        documentNumber: this.employee.documentNumber,
        bank: bankValueFromId(this.employee.bankId),
        accountType: this.employee.accountType,
        accountNumber: this.employee.accountNumber,
        cci: this.employee.cci,
        currencyId: this.employee.currencyId
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as EmployeeFormValue;
    this.isSaving = true;

    const request$: Observable<unknown> = this.employee
      ? this.service.update(this.employee.id, value)
      : this.service.create(value);

    request$.subscribe({
      next: () => {
        this.notify.success(this.isEdit ? 'Empleado actualizado.' : 'Empleado creado.');
        this.saved.emit();
      },
      error: () => (this.isSaving = false)
    });
  }
}
