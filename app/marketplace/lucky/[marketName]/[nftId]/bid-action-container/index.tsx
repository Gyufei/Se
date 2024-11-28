import { useMemo } from "react";
import { multiply } from "safebase";
import { useAccount } from "wagmi";

import NFTPrice from "@/app/_common/nft-price";
import NFTInfo from "@/app/_common/nft-info";
import BidActionBlock from "./bid-action-block";
import BidResult from "./bid-result";
import ClaimBidNFT from "./claim-bid-nft";
import NftSeller from "./nft-seller";
import OptimisticBuyout from "./optimistic-buyout";
import WinnerPrice from "./winner-price";
import WonBy from "./won-by";
import { useLuckyNFTPageContext } from "../page-context";
import { useRaePrice } from "@/lib/api/use-rae-price";
import ClaimBidRae from "./claim-bid-rae";
import RetrieveBidNFT from "./retrieve-bid-nft";
import { useCheckIsPoolCreator } from "@/lib/api/use-pools";
import { intersection } from "lodash";

export default function BidActionContainer() {
  const { address } = useAccount();
  const { nftInfo, isMarketAndNftPending, isAuctionPending, auctionInfo } =
    useLuckyNFTPageContext();
  const { data: raePriceData, isPending: isRaePricePending } = useRaePrice();
  const { data: asPoolCreator } = useCheckIsPoolCreator(address);
  const addressArr = [...asPoolCreator.poolAddrs, address];

  const isBidding = auctionInfo?.status === "BIDDING";
  const isCompleted = auctionInfo?.status === "COMPLETED";
  const isFailed = auctionInfo?.status === "FAILED";

  // TODO: if bid many time as diff pool creator, how we get the bidder?
  const asBidderAddrs = intersection(auctionInfo?.bidders, addressArr);
  const asBidderAddr = asBidderAddrs[0];
  const isBidder = asBidderAddrs.length > 0;

  const isWinner =
    isCompleted && isBidder && addressArr.includes(auctionInfo?.winner);

  const isBidderCanClaimRae =
    isFailed &&
    isBidder &&
    !isWinner &&
    auctionInfo?.auction_type === "REFUNDABLE";

  const claimRaeAmount = useMemo(() => {
    if (!isBidderCanClaimRae) return;

    const bidderIndex = auctionInfo?.bidders.findIndex(
      (b) => b === asBidderAddr!,
    );
    const bidAmount = auctionInfo?.bid_amounts[bidderIndex];

    return bidAmount;
  }, [isBidderCanClaimRae, auctionInfo, asBidderAddr]);

  const isCreatorCanClaimNFT =
    isFailed && addressArr.includes(auctionInfo?.seller);

  const nftPrice = useMemo(() => {
    if (isRaePricePending || isAuctionPending) return "0";
    return multiply(auctionInfo?.bidding_cap, raePriceData?.price);
  }, [auctionInfo, raePriceData, isRaePricePending, isAuctionPending]);

  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      <NFTInfo isPending={isMarketAndNftPending} nft={nftInfo} />
      <NftSeller isPending={isAuctionPending} seller={auctionInfo?.seller} />
      {isBidding ? (
        <>
          <NFTPrice
            isPending={isAuctionPending || isRaePricePending}
            price={nftPrice}
          />
          <BidActionBlock />
        </>
      ) : (
        <>
          <WonBy />
          <WinnerPrice />
          <OptimisticBuyout />
          {isBidder && <BidResult success={!!isWinner} />}
          {isWinner && (
            <ClaimBidNFT
              auctionId={auctionInfo.id}
              winner={auctionInfo.winner!}
            />
          )}
          {isCreatorCanClaimNFT && (
            <RetrieveBidNFT auctionId={auctionInfo.id} />
          )}
          {isBidderCanClaimRae && (
            <ClaimBidRae
              auctionId={auctionInfo.id}
              claimNum={claimRaeAmount || "0"}
              bidder={asBidderAddr}
            />
          )}
        </>
      )}
    </div>
  );
}
