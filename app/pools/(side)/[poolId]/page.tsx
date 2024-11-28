import { use } from "react";
import PoolInfoCard from "./pool-info-card";
import PoolBidRecord from "./pool-bid-record";
import { truncateAddr } from "@/lib/utils/web3";
import PoolAction from "./pool-action";

export default function Page({
  params,
}: {
  params: Promise<{ poolId: string }>;
}) {
  const pageParams = use(params);
  const poolId = pageParams.poolId;
  const displayPoolId = poolId.length > 6 ? truncateAddr(poolId) : poolId;

  return (
    <>
      <div className="text-[30px] font-medium text-white pb-5 px-6 border-b-2 border-[#ffffff10]">
        Pool: {displayPoolId}
      </div>
      <PoolInfoCard />
      <PoolAction poolId={poolId} />
      <PoolBidRecord />
    </>
  );
}
