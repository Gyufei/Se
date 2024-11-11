export function truncateAddr(address: string, [start, end]: [number, number] = [6, 4]): string {
  if (!address) return ''
  return `${address.slice(0, start)}...${address.slice(-end)}`
}