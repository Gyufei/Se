import { use } from "react";
import PoolInfoCard from "./pool-info-card";
import PoolBidRecord from "./pool-bid-record";
import PoolAction from "./pool-action";
import PoolName from "./pool-name";

export default function Page({
  params,
}: {
  params: Promise<{ poolAddress: string }>;
}) {
  const pageParams = use(params);
  const poolAddr = pageParams.poolAddress;

  return (
    <>
      <PoolName poolAddress={poolAddr} />
      <PoolInfoCard poolAddress={poolAddr} />
      <PoolAction poolAddress={poolAddr} />
      <PoolBidRecord poolAddress={poolAddr} />
    </>
  );
}
