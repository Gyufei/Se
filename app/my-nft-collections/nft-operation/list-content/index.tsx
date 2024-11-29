import NFTPrice from "@/app/_common/nft-price";
import ListingDetail from "./listing-details";
import { useMyNFTCollectionsPageContext } from "../../page-context";

export default function ListContent() {
  const { isPending, selectedNft } = useMyNFTCollectionsPageContext();

  return (
    <>
      <NFTPrice
        isPending={isPending}
        price={selectedNft?.price || ""}
        priceName="Last Floor Price"
        className="mt-3"
      />
      <ListingDetail />
    </>
  );
}
