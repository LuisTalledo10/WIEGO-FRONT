import { BankValue } from './enums';

/**
 * Catalog values mirror the backend seeds (SeedBanks, SeedCurrencyTypes).
 * TODO: replace with GET /Banks and GET /CurrencyTypes when those endpoints exist.
 */

export interface BankOption {
  /** payment_batch / employee / vendor store this numeric id */
  id: number;
  /** C# EnumBank member name — sent in create/update requests */
  value: BankValue;
  label: string;
}

export const BANKS: BankOption[] = [
  { id: 1, value: 'Bcp', label: 'BCP — Banco de Crédito del Perú' },
  { id: 2, value: 'BancoDeLaNacion', label: 'Banco de la Nación' },
  { id: 3, value: 'Bbva', label: 'BBVA Perú' },
  { id: 4, value: 'Scotiabank', label: 'Scotiabank Perú' },
  { id: 5, value: 'Interbank', label: 'Interbank' },
  { id: 99, value: 'Otro', label: 'Otro' }
];

export const bankLabel = (id: number): string =>
  BANKS.find(b => b.id === id)?.label ?? '—';

export const bankValueFromId = (id: number): BankValue =>
  BANKS.find(b => b.id === id)?.value ?? 'Otro';

export interface CurrencyOption {
  id: number;
  code: 'PEN' | 'USD';
  label: string;
  symbol: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { id: 2, code: 'PEN', label: 'Soles (S/)', symbol: 'S/' },
  { id: 1, code: 'USD', label: 'Dólares (US$)', symbol: 'US$' }
];

export const DEFAULT_CURRENCY_ID = 2; // PEN

export const currencySymbol = (id: number): string =>
  CURRENCIES.find(c => c.id === id)?.symbol ?? 'S/';

export const currencyCode = (id: number): string =>
  CURRENCIES.find(c => c.id === id)?.code ?? 'PEN';
