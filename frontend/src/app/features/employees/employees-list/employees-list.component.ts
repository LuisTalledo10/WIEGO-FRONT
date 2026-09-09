import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { DataTableCellDirective } from '@shared/components/tables/data-table/data-table-cell.directive';
import { ConfirmDialogComponent } from '@shared/components/modals/confirm-dialog/confirm-dialog.component';
import { SelectComponent, SelectOption } from '@shared/components/inputs/select/select.component';
import { NotificationService } from '@core/services/notification.service';
import { BANKS } from '@core/models/catalogs';
import { maskAccount } from '@core/utils/format.util';
import { EmployeesService } from '../data/employees.service';
import { Employee } from '../models/employee.models';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeePaymentDatesComponent } from '../employee-payment-dates/employee-payment-dates.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, PageHeaderComponent, ButtonComponent, DataTableComponent,
    DataTableCellDirective, ConfirmDialogComponent, SelectComponent,
    EmployeeFormComponent, EmployeePaymentDatesComponent
  ],
  templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent implements OnInit {
  private readonly service = inject(EmployeesService);
  private readonly notify = inject(NotificationService);

  readonly maskAccount = maskAccount;

  employees: Employee[] = [];
  isLoading = true;

  bankFilter: number | '' = '';
  readonly bankFilterOptions: SelectOption[] = [
    { value: '', label: 'Todos los bancos' },
    ...BANKS.map(b => ({ value: b.id, label: b.label }))
  ];

  columns: ColumnDef[] = [
    { key: 'fullName', header: 'Nombre' },
    { key: 'documentNumber', header: 'Documento' },
    { key: 'bankName', header: 'Banco' },
    { key: 'account', header: 'Cuenta', type: 'custom' },
    { key: 'payDates', header: 'Fechas de pago', align: 'center', type: 'custom' },
    {
      key: 'isActive', header: 'Estado', type: 'badge',
      badge: (row: Employee) => row.isActive
        ? { status: 'success', text: 'Activo' }
        : { status: 'default', text: 'Inactivo' }
    },
    { key: 'actions', header: '', align: 'right', type: 'custom' }
  ];

  formEmployee: Employee | null | undefined = undefined; // undefined = closed, null = new
  datesEmployee: Employee | null = null;
  employeeToDeactivate: Employee | null = null;
  isDeactivating = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.service
      .list({ bankId: this.bankFilter || undefined, onlyActive: false })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({ next: rows => (this.employees = rows) });
  }

  openNew(): void {
    this.formEmployee = null;
  }

  openEdit(employee: Employee): void {
    this.formEmployee = employee;
  }

  onFormSaved(): void {
    this.formEmployee = undefined;
    this.load();
  }

  onDatesSaved(): void {
    this.datesEmployee = null;
    this.load();
  }

  confirmDeactivate(): void {
    if (!this.employeeToDeactivate) return;
    this.isDeactivating = true;
    this.service.deactivate(this.employeeToDeactivate.id).subscribe({
      next: () => {
        this.notify.success('Empleado desactivado.');
        this.employeeToDeactivate = null;
        this.isDeactivating = false;
        this.load();
      },
      error: () => (this.isDeactivating = false)
    });
  }
}
