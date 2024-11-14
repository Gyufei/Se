"use client";
import { use } from "react";

import BidActionContainer from "./bid-action-container";
import BidNftContainer from "./bid-nft-container";

export default function NFTPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const nftParams = use(params);
  const nftId = nftParams.id;
  console.log(nftId);

  return (
    <div className="flex">
      <BidNftContainer />
      <BidActionContainer />
    </div>
  );
}
