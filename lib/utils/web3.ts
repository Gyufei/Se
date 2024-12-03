import { isAddressEqual } from "viem";

export function truncateAddr(
  address: string | undefined,
  [start, end]: [number, number] = [6, 4],
): string {
  if (!address) return "";
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function checkIsSameAddress(
  addr1: string | undefined,
  addr2: string | undefined,
) {
  if (!addr1 || !addr2) return false;
  return isAddressEqual(addr1 as any, addr2 as any);
}
