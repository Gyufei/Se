import { useMemo } from "react";
import { usePools } from "./use-pools";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";
import { useQuery } from "@tanstack/react-query";
import { checkIsSameAddress } from "../utils/web3";
import { useAccount } from "wagmi";
import { toLower } from "lodash";

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

export async function fetchPoolInfoOfUser(
  poolAddr: string,
  address: string | undefined,
) {
  if (!address) return undefined;

  const info = await apiFetcher(
    WithApiHost(`${ApiPaths.poolUserInfo}/${poolAddr}/${address}`),
  );
  return info as IPoolInfo;
}

export function usePoolInfoOfUser(poolAddr: string) {
  const { address } = useAccount();

  const result = useQuery({
    queryKey: ["pool", poolAddr],
    queryFn: () =>
      fetchPoolInfoOfUser(poolAddr, address ? toLower(address) : undefined),
    enabled: !!poolAddr && !!address,
  });

  return result;
}

export function usePoolInfo(poolAddr: string) {
  const { data: pools, isPending: isPoolsPending } = usePools();
  const { data: poolInfoOfUser, isPending: isPoolPending } =
    usePoolInfoOfUser(poolAddr);

  const poolAllInfo = useMemo(() => {
    if (!pools?.length || !poolInfoOfUser) return undefined;

    const poolBase = pools.find((p) => checkIsSameAddress(p.address, poolAddr));
    if (!poolBase) return undefined;

    return {
      base: poolBase,
      user: poolInfoOfUser,
    };
  }, [pools, poolAddr, poolInfoOfUser]);

  return {
    data: poolAllInfo,
    isPending: isPoolsPending || isPoolPending,
  };
}
