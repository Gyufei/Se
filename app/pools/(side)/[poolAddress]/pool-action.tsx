"use client";

import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { divide } from "safebase";
import Delegate from "./delegate";
import Undelegate from "./undelegate";
import { RAE } from "@/lib/const/platform";
import { usePoolRae } from "@/lib/web3/use-pool-rae";

export default function PoolAction({ poolAddress: poolAddr }: { poolAddress: string }) {
  const {
    data: rae,
    isPending,
    queryKey: raeQueryKey,
  } = useTokenBalance({
    address: RAE.address,
  });

  const raeDisplay = rae ? divide(String(rae), String(10 ** RAE.decimals)) : 0;

  const { data: poolRae, isPending: isPoolRaePending, queryKey: poolRaeQueryKey } = usePoolRae(poolAddr);

  const poolRaeDisplay = poolRae ? divide(String(poolRae), String(10 ** RAE.decimals)) : 0;

  return (
    <div className="mx-0 mt-4 bg-[#281A31] py-5 md:mx-6 md:mt-5">
      <Delegate
        poolId={poolAddr}
        rae={{
          value: raeDisplay,
          isPending,
          queryKey: raeQueryKey,
        }}
        poolRaeQueryKey={poolRaeQueryKey}
      />
      <Undelegate
        poolId={poolAddr}
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
