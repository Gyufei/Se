"use client";

import Image from "next/image";
import { MarketType, useMarkets } from "@/lib/api/use-markets";
import { range, sampleSize } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { INFT, useMarketsNfts } from "@/lib/api/use-market-nfts";
import { useRouter } from "next/navigation";

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
                <AssetItem key={n?.market_name} marketType="lucky" nft={n} />
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
                <AssetItem key={n?.market_name} marketType="quick" nft={n} />
              ))}
        </div>
      </div>
    </>
  );
}

function TrendingTitle({ marketType }: { marketType: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl">
        <span className="text-white">Trending Assets on</span>
        <span className="inline-block ml-3 text-green">
          {marketType} Market
        </span>
      </div>
      <div className="flex items-center text-base text-white">
        <span>Got questions?</span>
        <span className="inline-block ml-1 underline decoration-green underline-offset-4">
          Check our FAQ
        </span>
      </div>
    </div>
  );
}

function AssetItem({ marketType, nft }: { marketType: MarketType; nft: INFT }) {
  const router = useRouter();

  const handleGo = () => {
    if (marketType === "lucky") {
      router.push(
        `/marketplace/${marketType}/${nft.market_name}/${nft.token_id}`,
      );
    } else {
      router.push(`/marketplace/${marketType}/${nft.market_name}`);
    }
  };

  return (
    <div
      className="w-80 h-[172px] flex justify-start items-end overflow-hidden p-6"
      style={{
        backgroundColor:
          "linear-gradient(180deg, rgba(18, 2, 29, 0) 0%, #12021D 100%)",
        backgroundImage: `url('/images/home-asset-cover.svg'), url('${nft.token_uri}')`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="text-2xl text-white font-semibold">
          {nft.market_name}
        </div>
        <div
          onClick={handleGo}
          className="mt-[10px] flex items-center gap-2 cursor-pointer border-b border-green"
        >
          <Image
            src="/icons/bracket-up.svg"
            className="rotate-180"
            width={18}
            height={18}
            alt=""
          />
          <span className="text-sm text-white font-semibold">
            Jump to Vault
          </span>
        </div>
      </div>
    </div>
  );
}
