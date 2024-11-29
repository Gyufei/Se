import NFTInfo from "../../_common/nft-info";
import { useMyNFTCollectionsPageContext } from "../page-context";
import VaultListTabs from "./vault-list-tabs";

export default function NftOperation() {
  const { isPending, selectedNft } = useMyNFTCollectionsPageContext();

  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      {selectedNft ? (
        <>
          <NFTInfo isPending={isPending} nft={selectedNft || undefined} />
          <VaultListTabs />
        </>
      ) : (
        <div className="h-[300px] w-full flex items-center justify-center text-[#ffffff60] text-xl font-medium">
          Select an NFT
        </div>
      )}
    </div>
  );
}
