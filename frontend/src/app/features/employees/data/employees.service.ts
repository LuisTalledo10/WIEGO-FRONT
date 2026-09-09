import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { Employee, EmployeeFilters, EmployeeFormValue } from '../models/employee.models';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private readonly api = inject(ApiService);

  list(filters: EmployeeFilters = {}): Observable<Employee[]> {
    return this.api.get<Employee[]>('Employees', {
      bankId: filters.bankId,
      onlyActive: filters.onlyActive ?? true
    });
  }

  create(value: EmployeeFormValue): Observable<string> {
    return this.api.post<string>('Employee', value);
  }

  update(id: string, value: EmployeeFormValue): Observable<boolean> {
    return this.api.put<boolean>(`Employee/${id}`, { employeeId: id, ...value });
  }

  deactivate(id: string): Observable<boolean> {
    return this.api.delete<boolean>(`Employee/${id}`);
  }

  setPaymentDates(id: string, dates: string[]): Observable<boolean> {
    return this.api.put<boolean>(`Employee/${id}/PaymentDates`, dates);
  }
}
