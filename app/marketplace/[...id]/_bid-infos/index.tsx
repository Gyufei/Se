import BidActionContainer from "./_bid-action-container";
import BidResult from "./bid-result";
import ClaimNFT from "./claim-nft";
import ClaimRae from "./claim-rae";
import NFTInfo from "./nft-info";
import NFTPrice from "./nft-price";
import OptimisticBuyout from "./optimistic-buyout";
import WinnerPrice from "./winner-price";
import WonBy from "./won-by";

const isBidding = false;
const isBidSuccess = true;

export default function BidInfos() {
  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      <NFTInfo />
      {isBidding ? (
        <>
          <NFTPrice />
          <BidActionContainer />
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
