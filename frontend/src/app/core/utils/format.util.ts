import { currencySymbol } from '@core/models/catalogs';

/** "S/ 1,250.00" — symbol resolved from a currency id, or a plain symbol string. */
export function formatCurrency(amount: number | null | undefined, currency: number | string = 'S/'): string {
  const value = Number(amount ?? 0);
  const symbol = typeof currency === 'number' ? currencySymbol(currency) : currency;
  return `${symbol} ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Masks all but the last 4 digits of an account number. */
export function maskAccount(account: string | null | undefined): string {
  const value = (account ?? '').trim();
  if (value.length <= 4) return value;
  return `•••• ${value.slice(-4)}`;
}

/** "2026-09" -> "Setiembre 2026" */
export function formatPeriod(period: string | null | undefined): string {
  if (!period) return '—';
  const [year, month] = period.split('-');
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const idx = Number(month) - 1;
  return idx >= 0 && idx < 12 ? `${months[idx]} ${year}` : period;
}
