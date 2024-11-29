import { useQuery } from "@tanstack/react-query";
import { ApiPaths, WithApiHost } from "./api-paths";
import { apiFetcher } from "../fetcher";
import { useMemo } from "react";

export type IPoolStatus = "ACTIVE" | "LIQUIDATING";

export interface IPoolBase {
  name: string;
  status: IPoolStatus;
  address: string;
  creator_bonus: string;
  creator: string;
  delegator: string;
  create_at: string;
  capacity: string;
}

export async function fetchPools() {
  const result = await apiFetcher(WithApiHost(ApiPaths.pools));
  console.log(result);
  return [] as Array<IPoolBase>;
  // return result as IPoolBase[];
}

export function usePools() {
  const result = useQuery({
    queryKey: ["pools"],
    queryFn: fetchPools,
  });

  return result;
}

export function useCheckIsPool(addr: string | undefined) {
  const result = usePools();

  return {
    ...result,
    data:
      addr && result.data && result.data.some((pool) => pool.address === addr),
  };
}

export function useCheckIsPoolCreator(addr: string | undefined) {
  const result = usePools();

  const poolOfAddr = useMemo(() => {
    if (!addr || !result.data) return [];

    return result.data
      .filter((pool) => pool.status === "ACTIVE")
      .filter((pool) => pool.creator === addr);
  }, [addr, result.data]);

  return {
    ...result,
    data: {
      isAPoolCreator: !!poolOfAddr.length,
      pools: poolOfAddr,
      poolAddrs: poolOfAddr.map((pool) => pool.address),
    },
  };
}
