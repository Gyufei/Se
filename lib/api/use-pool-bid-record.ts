import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";

export interface IBiddingRecord {
  token_address: string;
  token_id: string;
  result: "WIN" | "FAILED" | "UNKNOWN";
  bid_at: string;
}

export async function fetchPoolBidRecord(address: string) {
  const record = await apiFetcher(
    WithApiHost(`${ApiPaths.poolRecords}/${address}`),
  );
  return record as Array<IBiddingRecord>;
}

export function usePoolBidRecord(address: string) {
  const result = useQuery({
    queryKey: ["pool", "bid_record", address],
    queryFn: () => fetchPoolBidRecord(address),
    enabled: !!address,
  });

  return result;
}
