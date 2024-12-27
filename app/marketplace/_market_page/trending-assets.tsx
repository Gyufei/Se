"use client";

import { useMarkets } from "@/lib/api/use-markets";
import { range, sampleSize } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketsNfts } from "@/lib/api/use-market-nfts";
import TrendingTitle from "./trending-title";
import AssetItem from "./asset-item";
import Qa from "./qa";

export default function TrendingAssets() {
  const { data: markets, isPending: isMarketsPending } = useMarkets();

  const luckyMarkets = markets?.filter((m) => m.supported_market_types.includes("lucky")) || [];

  const quickMarkets = markets?.filter((m) => m.supported_market_types.includes("quick")) || [];

  const { data: luckyNfts, isPending: isLuckyNftsPending } = useMarketsNfts(luckyMarkets);
  const { data: quickNfts, isPending: isQuickNftsPending } = useMarketsNfts(quickMarkets);

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
      <div className="mt-[50px] md:mt-[100px]">
        <TrendingTitle marketType="Lucky" />
        <div className="mt-5 flex flex-col items-center justify-start gap-y-5 md:flex-row md:items-center md:justify-start md:gap-x-5">
          {isMarketsPending || isLuckyNftsPending || !luckyNfts1.length
            ? range(3).map((i) => <Skeleton key={i} className="h-[172px] w-80" />)
            : luckyNfts1.map((n) => <AssetItem key={n?.token_id} marketType="lucky" nft={n} />)}
        </div>
        <Qa className="mt-5 md:hidden" />
      </div>
      <div className="mt-[50px] md:mt-[100px]">
        <TrendingTitle marketType="Quick" />
        <div className="mt-5 flex flex-col items-center justify-start gap-y-5 md:flex-row md:items-center md:justify-start md:gap-x-5">
          {isMarketsPending || isQuickNftsPending || !quickNfts1.length
            ? range(3).map((i) => <Skeleton key={i} className="h-[172px] w-80" />)
            : quickNfts1.map((n) => <AssetItem key={n?.token_id} marketType="quick" nft={n} />)}
        </div>
        <Qa className="mt-5 md:hidden" />
      </div>
    </>
  );
}
