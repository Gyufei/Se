import { useMemo } from "react";
import { usePools } from "./use-pools";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";
import { useQuery } from "@tanstack/react-query";
import { checkIsSameAddress } from "../utils/web3";

export interface IPoolInfo {
  total_staked: string;
  total_withdraw: string;
}

export interface IBiddingRecord {
  token_address: string;
  token_id: string;
  result: "Win" | "Failed";
  bid_at: string;
}

export async function fetchPoolInfoOfUser(address: string) {
  const info = await apiFetcher(
    WithApiHost(`${ApiPaths.poolUserInfo}/${address}`),
  );
  return info as IPoolInfo;
}

export function usePoolInfoOfUser(address: string) {
  const result = useQuery({
    queryKey: ["pool", address],
    queryFn: () => fetchPoolInfoOfUser(address),
    enabled: !!address,
  });

  return result;
}

export function usePoolInfo(address: string) {
  const { data: pools, isPending: isPoolsPending } = usePools();
  const { data: poolInfoOfUser, isPending: isPoolPending } =
    usePoolInfoOfUser(address);

  const poolAllInfo = useMemo(() => {
    if (!pools?.length || !poolInfoOfUser) return undefined;

    const poolBase = pools.find((p) => checkIsSameAddress(p.address, address));
    if (!poolBase) return undefined;

    return {
      base: poolBase,
      user: poolInfoOfUser,
    };
  }, [pools, address, poolInfoOfUser]);

  return {
    data: poolAllInfo,
    isPending: isPoolsPending || isPoolPending,
  };
}
