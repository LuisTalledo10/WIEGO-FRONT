import { BankValue, BankAccountType, DocumentType } from '@core/models/enums';

export interface Employee {
  id: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  bankId: number;
  bankName: string;
  accountType: BankAccountType;
  accountNumber: string;
  cci: string;
  currencyId: number;
  isActive: boolean;
  paymentDates: string[]; // ISO yyyy-MM-dd
}

export interface EmployeeFormValue {
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  bank: BankValue;
  accountType: BankAccountType;
  accountNumber: string;
  cci: string;
  currencyId: number;
}

export interface EmployeeFilters {
  bankId?: number;
  onlyActive?: boolean;
}
