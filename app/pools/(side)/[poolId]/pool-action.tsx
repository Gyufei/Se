"use client";

import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { divide } from "safebase";
import Delegate from "./delegate";
import Undelegate from "./undelegate";
import { RAE } from "@/lib/const/rae";
import { usePoolRae } from "@/lib/web3/use-pool-rae";

export default function PoolAction({ poolId }: { poolId: string }) {
  const {
    data: rae,
    isPending,
    queryKey: raeQueryKey,
  } = useTokenBalance({
    address: RAE.address,
  });

  const raeDisplay = rae ? divide(String(rae), String(10 ** RAE.decimals)) : 0;

  const {
    data: poolRae,
    isPending: isPoolRaePending,
    queryKey: poolRaeQueryKey,
  } = usePoolRae(poolId);

  const poolRaeDisplay = poolRae
    ? divide(String(poolRae), String(10 ** RAE.decimals))
    : 0;

  return (
    <div className="bg-[#281A31] mx-6 mt-5 py-5">
      <Delegate
        poolId={poolId}
        rae={{
          value: raeDisplay,
          isPending,
          queryKey: raeQueryKey,
        }}
        poolRaeQueryKey={poolRaeQueryKey}
      />
      <Undelegate
        poolId={poolId}
        poolRae={{
          value: poolRaeDisplay,
          isPending: isPoolRaePending,
          queryKey: poolRaeQueryKey,
        }}
        raeQueryKey={raeQueryKey}
      />
    </div>
  );
}
