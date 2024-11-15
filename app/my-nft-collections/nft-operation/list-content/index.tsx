import NFTPrice from "@/app/_common/nft-price";
import ListingDetail from "./listing-details";
import ListBtn from "./list-btn";

export default function ListContent() {
  return (
    <>
      <NFTPrice priceName="Last Floor Price" className="mt-3" />
      <ListingDetail />
      <ListBtn />
    </>
  );
}
