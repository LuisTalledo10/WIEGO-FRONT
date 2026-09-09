import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { PayableStatus } from '@core/models/enums';
import {
  VendorBalance,
  VendorFormValue,
  VendorPayable,
  VendorPayableFormValue
} from '../models/vendor.models';

@Injectable({ providedIn: 'root' })
export class VendorsService {
  private readonly api = inject(ApiService);

  /** GET /Vendor/Balances — used as the vendor directory (id + name + outstanding balance). */
  list(): Observable<VendorBalance[]> {
    return this.api.get<VendorBalance[]>('Vendor/Balances');
  }

  create(value: VendorFormValue): Observable<string> {
    return this.api.post<string>('Vendor', value);
  }

  payables(vendorId: string, status?: PayableStatus): Observable<VendorPayable[]> {
    return this.api.get<VendorPayable[]>(`Vendor/${vendorId}/Payables`, { status });
  }

  createPayable(value: VendorPayableFormValue): Observable<string> {
    return this.api.post<string>('Vendor/Payable', value);
  }

  cancelPayable(payableId: string): Observable<boolean> {
    return this.api.post<boolean>(`Vendor/Payable/${payableId}/Cancel`);
  }
}
