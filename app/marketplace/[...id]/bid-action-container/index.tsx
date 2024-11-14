import BidActionBlock from "./bid-action-block";
import BidResult from "./bid-result";
import ClaimNFT from "./claim-nft";
import ClaimRae from "./claim-rae";
import NFTInfo from "../../../_common/nft-info";
import NFTPrice from "../../../_common/nft-price";
import NftSeller from "./nft-seller";
import OptimisticBuyout from "./optimistic-buyout";
import WinnerPrice from "./winner-price";
import WonBy from "./won-by";

const isBidding = false;
const isBidSuccess = true;

export default function BidActionContainer() {
  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      <NFTInfo />
      <NftSeller />
      {isBidding ? (
        <>
          <NFTPrice />
          <BidActionBlock />
        </>
      ) : (
        <>
          <WonBy />
          <WinnerPrice />
          <OptimisticBuyout />
          <BidResult success={isBidSuccess} />
        </>
      )}
      {isBidSuccess ? <ClaimNFT /> : <ClaimRae />}
    </div>
  );
}
