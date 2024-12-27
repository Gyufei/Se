"use client";

import NftFallbackImage from "@/app/_common/nft-fallback-image";
import { INFT } from "@/lib/api/use-market-nfts";
import { MarketType } from "@/lib/api/use-markets";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AssetItem({ marketType, nft }: { marketType: MarketType; nft: INFT }) {
  const router = useRouter();

  const handleGo = () => {
    router.push(`/marketplace/collection/${nft.market_name}?type=${marketType === "lucky" ? "Vaulted" : "Listed"}`);
  };

  return (
    <div
      className="relative flex h-[184px] w-80 items-end justify-start overflow-hidden p-6 md:h-[172px]"
      style={{
        backgroundColor: "linear-gradient(180deg, rgba(18, 2, 29, 0) 0%, #12021D 100%)",
        backgroundImage: `url('/images/home-asset-cover.svg')`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <NftFallbackImage
        className="absolute bottom-0 right-0 z-[-1]"
        width={320}
        height={172}
        src={nft.token_uri}
        alt="nft"
      />
      <div>
        <div className="text-2xl font-semibold text-white">{nft.market_name}</div>
        <div onClick={handleGo} className="mt-[10px] flex cursor-pointer items-center gap-2 border-b border-green">
          <Image src="/icons/bracket-up.svg" className="rotate-180" width={18} height={18} alt="" />
          <span className="text-sm font-semibold text-white">
            Jump to {marketType === "lucky" ? "Vaults" : "Collections"}
          </span>
        </div>
      </div>
    </div>
  );
}
