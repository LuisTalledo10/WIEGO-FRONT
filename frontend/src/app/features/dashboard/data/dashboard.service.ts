import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { VendorsService } from '@features/vendors/data/vendors.service';
import { PaymentBatchSummary, PaymentReport } from '@core/models/payment-batch.models';
import { VendorBalance } from '@features/vendors/models/vendor.models';

export interface DashboardData {
  report: PaymentReport;
  balances: VendorBalance[];
  batches: PaymentBatchSummary[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly batchesService = inject(PaymentBatchesService);
  private readonly vendorsService = inject(VendorsService);

  load(): Observable<DashboardData> {
    return forkJoin({
      report: this.batchesService.report(),
      balances: this.vendorsService.list(),
      batches: this.batchesService.list()
    });
  }
}
