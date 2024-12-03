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
  const pageParams = use(params);

  const marketName = pageParams.marketName;
  const nftId = pageParams.nftId;

  return (
    <LuckyNFTPageProvider marketName={marketName} nftId={nftId}>
      <div className="flex min-w-[1440px] max-w-[1920px] mx-auto">
        <BidNftContainer />
        <BidActionContainer />
      </div>
    </LuckyNFTPageProvider>
  );
}
