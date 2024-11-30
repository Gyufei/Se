import { useMemo } from "react";
import { usePools } from "./use-pools";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";
import { useQuery } from "@tanstack/react-query";
import { checkIsSameAddress } from "../utils/web3";

export interface IPoolInfo {
  acc_profit: string;
  delegate_able: string;
  bidding_records: IBiddingRecord[];
}

export interface IBiddingRecord {
  token_address: string;
  token_id: string;
  result: "Win" | "Failed";
  bid_at: string;
}

export async function fetchPool(address: string) {
  const info = await apiFetcher(WithApiHost(`${ApiPaths.pool}/${address}`));
  return info as IPoolInfo;
}

export function usePool(address: string) {
  const result = useQuery({
    queryKey: ["pool", address],
    queryFn: () => fetchPool(address),
    enabled: !!address,
  });

  return result;
}

export function usePoolInfo(address: string) {
  const { data: pools, isPending: isPoolsPending } = usePools();
  const { data: poolInfo, isPending: isPoolPending } = usePool(address);

  const poolAllInfo = useMemo(() => {
    if (!pools?.length || !poolInfo) return undefined;

    const poolBase = pools.find((p) => checkIsSameAddress(p.address, address));
    if (!poolBase) return undefined;

    return {
      base: poolBase,
      info: poolInfo,
    };
  }, [pools, address, poolInfo]);

  return {
    data: poolAllInfo,
    isPending: isPoolsPending || isPoolPending,
  };
}
