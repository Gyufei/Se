"use client";
import { use } from "react";

import BidActionContainer from "./bid-action-container";
import BidNftContainer from "./bid-nft-container";
import { LuckyNFTPageProvider } from "./page-context";

export default function Page({
  params,
}: {
  params: Promise<{ marketName: string; nftId: string }>;
}) {
  const nftParams = use(params);

  const marketName = nftParams.marketName;
  const nftId = nftParams.nftId;

  return (
    <LuckyNFTPageProvider marketName={marketName} nftId={nftId}>
      <div className="flex min-w-[1440px] overflow-x-auto">
        <BidNftContainer />
        <BidActionContainer />
      </div>
    </LuckyNFTPageProvider>
  );
}
