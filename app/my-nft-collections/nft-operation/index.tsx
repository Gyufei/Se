"use client";
import NFTInfo from "../../_common/nft-info";
import { useMyNFTCollectionsPageContext } from "../page-context";
import VaultListTabs from "./vault-list-tabs";
import CloseIcon from "@/app/_common/close-icon";

export default function NftOperation() {
  const { isPending, selectedNft, setSelectedNft } =
    useMyNFTCollectionsPageContext();

  if (!selectedNft) return null;

  return (
    <div className="w-[580px] relative px-6 py-[46px] bg-[#1d0e27]">
      <CloseIcon
        onClick={() => setSelectedNft(null)}
        className="absolute top-12 right-6"
      />
      <NFTInfo isPending={isPending} nft={selectedNft || undefined} />
      <VaultListTabs />
    </div>
  );
}
