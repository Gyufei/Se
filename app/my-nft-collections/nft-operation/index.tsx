"use client";
import Image from "next/image";
import NFTInfo from "../../_common/nft-info";
import { useMyNFTCollectionsPageContext } from "../page-context";
import VaultListTabs from "./vault-list-tabs";

export default function NftOperation() {
  const { isPending, selectedNft, setSelectedNft } =
    useMyNFTCollectionsPageContext();

  if (!selectedNft) return null;

  return (
    <div className="w-[580px] relative px-6 py-[46px] bg-[#1d0e27]">
      <Image
        src="/icons/close-fill.svg"
        width={24}
        height={24}
        alt="close"
        className="absolute top-12 right-6 cursor-pointer"
        onClick={() => setSelectedNft(null)}
      />
      <NFTInfo isPending={isPending} nft={selectedNft || undefined} />
      <VaultListTabs />
    </div>
  );
}
