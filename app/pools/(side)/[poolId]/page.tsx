"use client";

import { use } from "react";
import PoolInfoCard from "./pool-info-card";
import DelegateAction from "./delegate-action";
import PoolBidRecord from "./pool-bid-record";

export default function Page({
  params,
}: {
  params: Promise<{ poolId: string[] }>;
}) {
  const nftParams = use(params);
  const poolId = nftParams.poolId;
  console.log(poolId);

  return (
    <>
      <div className="text-[30px] font-medium text-white pb-5 px-6 border-b-2 border-[#ffffff10]">
        Pool: {poolId}
      </div>
      <PoolInfoCard />
      <DelegateAction />
      <PoolBidRecord />
    </>
  );
}
