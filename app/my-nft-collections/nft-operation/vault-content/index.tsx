import NFTPrice from "@/app/_common/nft-price";
import CreateBidding from "./cerate-bidding";
import VaultBtn from "./vault-btn";

export default function VaultContent() {
  return (
    <>
      <NFTPrice className="mt-3" />
      <CreateBidding />
      <VaultBtn />
    </>
  );
}
