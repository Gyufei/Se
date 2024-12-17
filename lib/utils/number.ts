import numeral from "numeral";

export function formatNumber(value: number | string | undefined): string {
  if (!value) return "";

  if (Number(value) < 0.01) {
    return value.toString();
  }

  return numeral(value).format("0,0.[00]");
}

export function formatNumberWithUnit(
  value: number | string | undefined,
): string {
  if (!value) return "";

  if (Number(value) < 1) {
    return value.toString();
  }

  return numeral(value).format("0,0.[00]a").toUpperCase();
}

export function formatPercent(value: number | string | undefined): string {
  if (!value) return "";

  if (Number(value) === 0) return "0%";

  if (Number(value) < 0.0001) {
    return "<0.01%";
  }

  return numeral(value).format("0.[00]%");
}

export function maybeSmallNumber(
  value: number | string | undefined,
  limit: number,
): string {
  if (!value) return "";

  if (Number(value) === 0) return "0";

  if (Number(value) < limit) {
    return `<${limit.toString()}`;
  }

  return formatPercent(value);
}
