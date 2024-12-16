"use client";
import { use } from "react";

import BidActionContainer from "./bid-action-container";
import BidNftContainer from "./bid-nft-container";
import { LuckyNFTPageProvider } from "./page-context";

export default function Page({
  params,
}: {
  params: Promise<{ marketName: string; vaultNftId: string }>;
}) {
  const pageParams = use(params);

  const marketName = pageParams.marketName;
  const vaultNftId = pageParams.vaultNftId;

  return (
    <LuckyNFTPageProvider marketName={marketName} vaultNftId={vaultNftId}>
      <div className="flex min-w-[1440px] max-w-[1920px] mx-auto">
        <BidNftContainer />
        <BidActionContainer />
      </div>
    </LuckyNFTPageProvider>
  );
}
