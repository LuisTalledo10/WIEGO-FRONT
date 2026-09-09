import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { DrawerComponent } from '@shared/components/modals/drawer/drawer.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state/empty-state.component';
import { NotificationService } from '@core/services/notification.service';
import { EmployeesService } from '../data/employees.service';
import { Employee } from '../models/employee.models';

@Component({
  selector: 'app-employee-payment-dates',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, DrawerComponent, ButtonComponent, EmptyStateComponent],
  templateUrl: './employee-payment-dates.component.html',
  styleUrls: ['./employee-payment-dates.component.scss']
})
export class EmployeePaymentDatesComponent implements OnInit {
  @Input({ required: true }) employee!: Employee;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly service = inject(EmployeesService);
  private readonly notify = inject(NotificationService);

  dates: string[] = [];
  newDate = '';
  isSaving = false;

  ngOnInit(): void {
    this.dates = [...(this.employee.paymentDates ?? [])].sort();
  }

  add(): void {
    const value = this.newDate?.trim();
    if (!value || this.dates.includes(value)) return;
    this.dates = [...this.dates, value].sort();
    this.newDate = '';
  }

  remove(date: string): void {
    this.dates = this.dates.filter(d => d !== date);
  }

  save(): void {
    this.isSaving = true;
    this.service.setPaymentDates(this.employee.id, this.dates).subscribe({
      next: () => {
        this.notify.success('Fechas de pago actualizadas.');
        this.saved.emit();
      },
      error: () => (this.isSaving = false)
    });
  }
}
