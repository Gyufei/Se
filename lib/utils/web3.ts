import { lowerCase } from "lodash";

export function truncateAddr(
  address: string | undefined,
  [start, end]: [number, number] = [6, 4],
): string {
  if (!address) return "";
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function checkIsSameAddress(addr1: string, addr2: string) {
  return lowerCase(addr1) === lowerCase(addr2);
}
