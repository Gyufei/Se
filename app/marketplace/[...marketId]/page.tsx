"use client";
import { use } from "react";

import BidActionContainer from "./bid-action-container";
import BidNftContainer from "./bid-nft-container";

export default function NFTPage({
  params,
}: {
  params: Promise<{ marketId: string[] }>;
}) {
  const nftParams = use(params);
  const nftId = nftParams.marketId;
  console.log(nftId);

  return (
    <div className="flex min-w-[1440px] overflow-x-auto">
      <BidNftContainer />
      <BidActionContainer />
    </div>
  );
}
