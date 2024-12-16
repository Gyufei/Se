"use client";

import NftFallbackImage  from "@/app/_common/nft-fallback-image";
import { INFT } from "@/lib/api/use-market-nfts";
import { MarketType } from "@/lib/api/use-markets";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AssetItem({
  marketType,
  nft,
}: {
  marketType: MarketType;
  nft: INFT;
}) {
  const router = useRouter();

  const handleGo = () => {
    router.push(
      `/marketplace/collection/${nft.market_name}?type=${marketType === "lucky" ? "Vaulted" : "Listed"}`,
    );
  };

  return (
    <div
      className="w-80 h-[172px] flex justify-start items-end overflow-hidden p-6 relative"
      style={{
        backgroundColor:
          "linear-gradient(180deg, rgba(18, 2, 29, 0) 0%, #12021D 100%)",
        backgroundImage: `url('/images/home-asset-cover.svg')`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <NftFallbackImage className="z-[-1]" src={nft.token_uri} fill alt="nft" />
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
            Jump to {marketType === "lucky" ? "Vaults" : "Collections"}
          </span>
        </div>
      </div>
    </div>
  );
}
