"use client";

import { useMarkets } from "@/lib/api/use-markets";
import { range, sampleSize } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketsNfts } from "@/lib/api/use-market-nfts";
import TrendingTitle from "./trending-title";
import AssetItem from "./asset-item";

export default function TrendingAssets() {
  const { data: markets, isPending: isMarketsPending } = useMarkets();

  const luckyMarkets =
    markets?.filter((m) => m.supported_market_types.includes("lucky")) || [];

  const quickMarkets =
    markets?.filter((m) => m.supported_market_types.includes("quick")) || [];

  const { data: luckyNfts, isPending: isLuckyNftsPending } =
    useMarketsNfts(luckyMarkets);
  const { data: quickNfts, isPending: isQuickNftsPending } =
    useMarketsNfts(quickMarkets);

  const luckyNfts3 = sampleSize(
    luckyNfts.filter((n) => n.status === "VAULTED"),
    3,
  );

  const quickNfts3 = sampleSize(
    quickNfts.filter((n) => n.status === "LISTED"),
    3,
  );

  console.log(luckyNfts3, quickNfts3);

  return (
    <>
      <div className="mt-[100px]">
        <TrendingTitle marketType="Lucky" />
        <div className="flex mt-5 items-center justify-between">
          {isMarketsPending || isLuckyNftsPending || !luckyNfts3.length
            ? range(3).map((i) => (
                <Skeleton key={i} className="w-80 h-[172px]" />
              ))
            : luckyNfts3.map((n) => (
                <AssetItem key={n?.token_id} marketType="lucky" nft={n} />
              ))}
        </div>
      </div>
      <div className="mt-[100px]">
        <TrendingTitle marketType="Quick" />
        <div className="flex mt-5 items-center justify-between">
          {isMarketsPending || isQuickNftsPending || !quickNfts3.length
            ? range(3).map((i) => (
                <Skeleton key={i} className="w-80 h-[172px]" />
              ))
            : quickNfts3.map((n) => (
                <AssetItem key={n?.token_id} marketType="quick" nft={n} />
              ))}
        </div>
      </div>
    </>
  );
}
