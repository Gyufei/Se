import { useMemo } from "react";
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
import ClaimBidRae from "./claim-bid-rae";
import RetrieveBidNFT from "./retrieve-bid-nft";
import { useCheckIsPoolCreator } from "@/lib/api/use-pools";
import { toLower } from "lodash";
import { checkIsSameAddress } from "@/lib/utils/web3";

export default function BidActionContainer() {
  const { address } = useAccount();
  const { nftInfo, isMarketAndNftPending, isAuctionPending, auctionInfo } =
    useLuckyNFTPageContext();
  const { data: asPoolCreator } = useCheckIsPoolCreator(address);

  const isBidding = auctionInfo?.status === "BIDDING";
  const isCompleted = auctionInfo?.status === "COMPLETED";
  const isFailed = auctionInfo?.status === "FAILED";

  const addressArr = useMemo(
    () => [...asPoolCreator.poolAddrs, toLower(address)],
    [asPoolCreator.poolAddrs, address],
  );

  const isBidder = auctionInfo?.bidders.some((b) => addressArr.includes(b));

  const isWinner = isCompleted && addressArr.includes(auctionInfo?.winner);

  const winnerInfo = useMemo(() => {
    if (!auctionInfo || !isCompleted) return;

    const winnerAddr = auctionInfo?.winner;
    if (!winnerAddr) return;

    const info = auctionInfo?.bidder_infos.find((b) => b.bidder === winnerAddr);
    return info;
  }, [auctionInfo, isCompleted]);

  const canClaimBidderInfo = useMemo(() => {
    if (
      !auctionInfo ||
      !(isFailed || isCompleted) ||
      auctionInfo?.auction_type !== "REFUNDABLE" ||
      !isBidder
    ) {
      return;
    }

    // TODO: if bid many time as diff pool creator, how we get the bidder?
    const info = auctionInfo?.bidder_infos.find(
      (b) => addressArr.includes(b.bidder) && !b.bid_withdrawn,
    );

    return info;
  }, [auctionInfo, addressArr, isCompleted, isFailed, isBidder]);

  const canClaimCreatorInfo = useMemo(() => {
    if (!auctionInfo || !isFailed) return;

    const isCreator = addressArr.some((addr) =>
      checkIsSameAddress(addr, auctionInfo?.seller),
    );

    if (!isCreator) return;

    return {
      creator: auctionInfo?.seller,
      withdrawn: auctionInfo?.sell_withdrawn,
    };
  }, [auctionInfo, isFailed, addressArr]);

  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      <NFTInfo isPending={isMarketAndNftPending} nft={nftInfo} />
      <NftSeller isPending={isAuctionPending} seller={auctionInfo?.seller} />
      <NFTPrice
        isPending={isAuctionPending}
        price={nftInfo?.price}
        unit="RAE"
      />
      {isBidding && <BidActionBlock />}
      {isCompleted && (
        <>
          <WonBy />
          <WinnerPrice />
        </>
      )}
      {!isBidding && <OptimisticBuyout />}
      {(isCompleted || isFailed) && isBidder && (
        <BidResult success={!!isWinner} />
      )}
      {winnerInfo && !winnerInfo?.bid_withdrawn && (
        <ClaimBidNFT auctionId={auctionInfo!.id} winner={auctionInfo!.winner} />
      )}
      {canClaimCreatorInfo && !canClaimCreatorInfo.withdrawn && (
        <RetrieveBidNFT auctionId={auctionInfo!.id} />
      )}
      {canClaimBidderInfo && !canClaimBidderInfo?.bid_withdrawn && (
        <ClaimBidRae
          auctionId={auctionInfo!.id}
          claimNum={canClaimBidderInfo.bid_amount || "0"}
          bidder={canClaimBidderInfo?.bidder}
        />
      )}
    </div>
  );
}
