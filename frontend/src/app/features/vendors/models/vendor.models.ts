import { BankValue, BankAccountType, DocumentType, PayableStatus } from '@core/models/enums';

/** GET /Vendor/Balances — the closest thing to a vendor list the backend exposes. */
export interface VendorBalance {
  vendorId: string;
  vendorName: string;
  outstandingBalance: number;
  openPayables: number;
}

export interface VendorFormValue {
  name: string;
  documentType: DocumentType;
  documentNumber: string;
  bank: BankValue;
  accountType: BankAccountType;
  accountNumber: string;
  cci: string;
  currencyId: number;
}

/** VendorPayableDTO */
export interface VendorPayable {
  id: string;
  vendorId: string;
  documentNumber: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  currencyId: number;
  status: PayableStatus;
}

export interface VendorPayableFormValue {
  vendorId: string;
  documentNumber: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  currencyId: number;
}
