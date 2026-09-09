import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { saveBlobResponse } from '@core/utils/download.util';
import { BatchKind } from '@core/models/enums';
import {
  AddPaymentItemRequest,
  CreatePaymentBatchRequest,
  PaymentBatchDetail,
  PaymentBatchSummary,
  PaymentReport
} from '@core/models/payment-batch.models';

@Injectable({ providedIn: 'root' })
export class PaymentBatchesService {
  private readonly api = inject(ApiService);

  list(kind?: BatchKind): Observable<PaymentBatchSummary[]> {
    return this.api.get<PaymentBatchSummary[]>('PaymentBatch').pipe(
      map(batches => (kind ? batches.filter(b => b.batchKind === kind) : batches))
    );
  }

  get(id: string): Observable<PaymentBatchDetail> {
    return this.api.get<PaymentBatchDetail>(`PaymentBatch/${id}`);
  }

  create(request: CreatePaymentBatchRequest): Observable<string> {
    return this.api.post<string>('PaymentBatch', request);
  }

  addItem(request: AddPaymentItemRequest): Observable<string> {
    return this.api.post<string>('PaymentBatch/Item', request);
  }

  submit(id: string): Observable<boolean> {
    return this.api.post<boolean>(`PaymentBatch/${id}/Submit`);
  }

  approve(id: string): Observable<boolean> {
    return this.api.post<boolean>(`PaymentBatch/${id}/Approve`);
  }

  reject(id: string, reason: string): Observable<boolean> {
    return this.api.post<boolean>(`PaymentBatch/${id}/Reject`, { paymentBatchId: id, reason });
  }

  complete(id: string): Observable<boolean> {
    return this.api.post<boolean>(`PaymentBatch/${id}/Complete`);
  }

  /** Downloads the bank file(s): a .txt (single bank) or a .zip (multi-bank). */
  export(id: string): Observable<void> {
    return this.api.download(`PaymentBatch/${id}/Export`).pipe(
      map(response => saveBlobResponse(response, `orden-${id}`))
    );
  }

  report(): Observable<PaymentReport> {
    return this.api.get<PaymentReport>('PaymentBatch/Report');
  }
}
