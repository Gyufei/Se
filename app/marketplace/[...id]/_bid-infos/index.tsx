import BidActionContainer from "./_bid-action-container";
import { NFTInfo } from "./nft-info";
import { NFTPrice } from "./nft-price";
import WonBy from "./won-by";

export default function BidInfos() {
  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      <NFTInfo />
      <NFTPrice />
      <WonBy />
      <BidActionContainer />
    </div>
  );
}
