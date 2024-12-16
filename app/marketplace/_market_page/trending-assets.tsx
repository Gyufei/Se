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

  const luckyNfts1 = sampleSize(
    luckyNfts.filter((n) => n.status === "VAULTED"),
    1,
  );

  const quickNfts1 = sampleSize(
    quickNfts.filter((n) => n.status === "LISTED"),
    1,
  );

  return (
    <>
      <div className="mt-[100px]">
        <TrendingTitle marketType="Lucky" />
        <div className="flex mt-5 items-center justify-start gap-x-5">
          {isMarketsPending || isLuckyNftsPending || !luckyNfts1.length
            ? range(3).map((i) => (
                <Skeleton key={i} className="w-80 h-[172px]" />
              ))
            : luckyNfts1.map((n) => (
                <AssetItem key={n?.token_id} marketType="lucky" nft={n} />
              ))}
        </div>
      </div>
      <div className="mt-[100px]">
        <TrendingTitle marketType="Quick" />
        <div className="flex mt-5 items-center justify-start gap-x-5">
          {isMarketsPending || isQuickNftsPending || !quickNfts1.length
            ? range(3).map((i) => (
                <Skeleton key={i} className="w-80 h-[172px]" />
              ))
            : quickNfts1.map((n) => (
                <AssetItem key={n?.token_id} marketType="quick" nft={n} />
              ))}
        </div>
      </div>
    </>
  );
}
