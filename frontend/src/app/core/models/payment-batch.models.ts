import { BatchKind, BatchStatus, ItemStatus, PayeeType } from './enums';

export interface PaymentBatchSummary {
  id: string;
  name: string;
  period: string | null;
  batchKind: BatchKind;
  status: BatchStatus;
  createdAt: string;
}

export interface PaymentItem {
  id: string;
  payeeType: PayeeType;
  payeeName: string;
  bankName: string;
  accountNumber: string;
  cci: string;
  amount: number;
  currency: string;
  category: string | null;
  concept: string;
  status: ItemStatus;
}

export interface PaymentBatchDetail {
  id: string;
  name: string;
  period: string | null;
  batchKind: BatchKind;
  status: BatchStatus;
  createdByUserId: string;
  createdAt: string;
  submittedAt: string | null;
  approvedByUserId: string | null;
  approvedAt: string | null;
  rejectedByUserId: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  exportedAt: string | null;
  completedAt: string | null;
  items: PaymentItem[];
}

export interface CreatePaymentBatchRequest {
  name: string;
  batchKind: BatchKind;
  period?: string | null;
}

export interface AddPaymentItemRequest {
  paymentBatchId: string;
  payeeType: PayeeType;
  employeeId?: string | null;
  vendorId?: string | null;
  vendorPayableId?: string | null;
  amount: number;
  currencyId: number;
  categoryId?: number | null;
  concept: string;
}

/** GET /PaymentBatch/Report */
export interface PaymentReport {
  totalPaid: number;
  totalPending: number;
  byCategory: { category: string; itemCount: number; totalAmount: number }[];
}
