import NFTPrice from "@/app/_common/nft-price";
import CreateBidding from "./cerate-bidding";
import { useMyNFTCollectionsPageContext } from "../../page-context";

export default function VaultContent() {
  const { isPending, selectedNft } = useMyNFTCollectionsPageContext();

  return (
    <>
      <NFTPrice
        isPending={isPending}
        price={selectedNft?.price || ""}
        className="mt-3"
      />
      <CreateBidding />
    </>
  );
}
