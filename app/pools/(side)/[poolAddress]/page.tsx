import { use } from "react";
import PoolInfoCard from "./pool-info-card";
import PoolBidRecord from "./pool-bid-record";
import { truncateAddr } from "@/lib/utils/web3";
import PoolAction from "./pool-action";

export default function Page({
  params,
}: {
  params: Promise<{ poolAddress: string }>;
}) {
  const pageParams = use(params);
  const poolAddr = pageParams.poolAddress;
  const displayPoolAddr =
    poolAddr.length > 6 ? truncateAddr(poolAddr) : poolAddr;

  return (
    <>
      <div className="text-[30px] font-medium text-white pb-5 px-6 border-b-2 border-[#ffffff10]">
        Pool: {displayPoolAddr}
      </div>
      <PoolInfoCard poolAddress={poolAddr} />
      <PoolAction poolAddress={poolAddr} />
      <PoolBidRecord poolAddress={poolAddr} />
    </>
  );
}
