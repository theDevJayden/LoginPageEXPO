export type BudgetLevel = 'ok' | 'warning' | 'over';

export type BudgetSummary = {
  percent: number;
  level: BudgetLevel;
  remaining: number;
  overBy: number;
  ringFill: number;
};

export function formatNumber(value: number): string {
  return Math.abs(Math.round(value))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatRupiah(value: number): string {
  return `Rp${formatNumber(value)}`;
}

export function formatSignedRupiah(value: number): string {
  return `${value < 0 ? '-' : '+'}${formatRupiah(value)}`;
}

export function parseBudgetCap(raw: string): number | null {
  const text = raw.trim().replace(/\s/g, '');
  const digits = /^\d{1,3}(\.\d{3})+$/.test(text) ? text.replace(/\./g, '') : text;
  if (!/^\d+$/.test(digits)) return null;
  const value = Number(digits);
  return Number.isSafeInteger(value) && value > 0 ? value : null;
}

export const parseAmount = parseBudgetCap;

export function getBudgetSummary(spent: number, cap: number): BudgetSummary {
  const percent = Math.floor((spent * 100) / cap);
  const level: BudgetLevel = percent >= 100 ? 'over' : percent > 75 ? 'warning' : 'ok';
  return {
    percent,
    level,
    remaining: cap - spent,
    overBy: Math.max(0, spent - cap),
    ringFill: Math.min(percent, 100) / 100,
  };
}
