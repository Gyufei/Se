import numeral from "numeral";

export function formatNumber(value: number | string | undefined): string {
  if (!value) return "";

  return numeral(value).format("0,0.[00]");
}

export function formatNumberWithUnit(
  value: number | string | undefined,
): string {
  if (!value) return "";

  return numeral(value).format("0,0.[00]a").toUpperCase();
}

export function formatPercent(value: number | string | undefined): string {
  if (!value) return "";

  return numeral(value).format("0.[00]%");
}
