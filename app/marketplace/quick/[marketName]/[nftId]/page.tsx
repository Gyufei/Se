"use client";
import { use } from "react";
import { NFTNameAndImage } from "./nft-name-and-image";
import PriceAndOperation from "./price-and-operation";
import ActivityPanel from "./activity-panel";
import DetailsPanel from "./details-panel";
import DescPanel from "./desc-panel";
import { useQuickPageContext } from "../page-context";

export default function Page({
  params,
}: {
  params: Promise<{ nftId: string }>;
}) {
  const pageParams = use(params);
  const nftId = pageParams.nftId;

  const { marketInfo, isMarketPending, marketNfts, isNftsPending } =
    useQuickPageContext();

  const nft = marketNfts?.find((nft) => nft.token_id === nftId);

  const isPending = isMarketPending || isNftsPending || !nft;

  return (
    <div className="w-[580px] mx-auto">
      <NFTNameAndImage
        isPending={isPending}
        marketName={marketInfo?.market_name}
        nftName={nft?.token_id}
        img={nft?.token_uri || ""}
      />
      <PriceAndOperation isPending={isPending} nft={nft} />
      <ActivityPanel nft={nft} />
      <DetailsPanel isPending={isPending} nft={nft} marketInfo={marketInfo} />
      <DescPanel isPending={isPending} marketInfo={marketInfo} />
    </div>
  );
}
