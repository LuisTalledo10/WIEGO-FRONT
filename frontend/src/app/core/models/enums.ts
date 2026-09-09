import { BadgeStatus } from '@shared/components/badges/status-badge/status-badge.component';

/**
 * String values mirror what the .NET backend serializes / accepts.
 * Enum-typed request fields accept the C# member name (JsonStringEnumConverter is enabled).
 */

// ---- Documents / banking (used in Employee & Vendor forms) ----
export type DocumentType = 'DNI' | 'CE' | 'Passport' | 'RUC';
export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  DNI: 'DNI',
  CE: 'Carné de extranjería',
  Passport: 'Pasaporte',
  RUC: 'RUC'
};

export type BankAccountType = 'Corriente' | 'Ahorro' | 'Cci';
export const ACCOUNT_TYPE_LABELS: Record<BankAccountType, string> = {
  Corriente: 'Cuenta corriente',
  Ahorro: 'Cuenta de ahorros',
  Cci: 'CCI (interbancaria)'
};

// C# EnumBank member names, sent as-is in create/update requests.
export type BankValue = 'Bcp' | 'BancoDeLaNacion' | 'Bbva' | 'Scotiabank' | 'Interbank' | 'Otro';

// ---- Payment orders ----
export type BatchKind = 'Payroll' | 'Vendors' | 'Mixed';
export const BATCH_KIND_LABELS: Record<BatchKind, string> = {
  Payroll: 'Planilla',
  Vendors: 'Dispersión',
  Mixed: 'Mixta'
};

export type PayeeType = 'Employee' | 'Vendor';

// Batch status = seeded name from payment_batch_statuses.
export type BatchStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'EXPORTED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';
export const BATCH_STATUS_LABELS: Record<BatchStatus, string> = {
  DRAFT: 'Borrador',
  PENDING_APPROVAL: 'Pendiente de aprobación',
  APPROVED: 'Aprobada',
  EXPORTED: 'Exportada',
  COMPLETED: 'Pagada',
  REJECTED: 'Rechazada',
  CANCELLED: 'Cancelada'
};
export const BATCH_STATUS_BADGE: Record<BatchStatus, BadgeStatus> = {
  DRAFT: 'default',
  PENDING_APPROVAL: 'warning',
  APPROVED: 'processing',
  EXPORTED: 'processing',
  COMPLETED: 'success',
  REJECTED: 'error',
  CANCELLED: 'default'
};

// Item status = seeded name from payment_item_statuses.
export type ItemStatus = 'PENDING' | 'EXPORTED' | 'PAID' | 'FAILED' | 'CANCELLED';
export const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
  PENDING: 'Pendiente',
  EXPORTED: 'Exportado',
  PAID: 'Pagado',
  FAILED: 'Fallido',
  CANCELLED: 'Cancelado'
};
export const ITEM_STATUS_BADGE: Record<ItemStatus, BadgeStatus> = {
  PENDING: 'default',
  EXPORTED: 'processing',
  PAID: 'success',
  FAILED: 'error',
  CANCELLED: 'default'
};

// Vendor payable status = C# EnumPayableStatus.ToString().
export type PayableStatus = 'Open' | 'PartiallyPaid' | 'Paid' | 'Cancelled';
export const PAYABLE_STATUS_LABELS: Record<PayableStatus, string> = {
  Open: 'Abierta',
  PartiallyPaid: 'Pago parcial',
  Paid: 'Pagada',
  Cancelled: 'Cancelada'
};
export const PAYABLE_STATUS_BADGE: Record<PayableStatus, BadgeStatus> = {
  Open: 'warning',
  PartiallyPaid: 'processing',
  Paid: 'success',
  Cancelled: 'default'
};

// ---- Roles (JWT "role" claim is the numeric id) ----
export enum RoleId {
  SuperAdmin = 1,
  CompanyAdmin = 2,
  Finance = 3,
  Manager = 4,
  Employee = 5
}
export const ROLE_LABELS: Record<number, string> = {
  1: 'Super administrador',
  2: 'Administrador',
  3: 'Finanzas',
  4: 'Manager',
  5: 'Empleado'
};

export const CAN_SUBMIT_OR_EXPORT: RoleId[] = [RoleId.Finance, RoleId.CompanyAdmin];
export const CAN_APPROVE: RoleId[] = [RoleId.Manager, RoleId.CompanyAdmin];
