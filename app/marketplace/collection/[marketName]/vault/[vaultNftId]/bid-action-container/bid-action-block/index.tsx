import { useMemo } from "react";
import { useLuckyNFTPageContext } from "../../page-context";
import BidAction from "./bid-action";
import BidProgress from "./bid-progress";
import CloseCountdown from "./close-countdown";

export default function BidActionBlock() {
  const { auctionInfo } = useLuckyNFTPageContext();

  const isFinished = useMemo(() => {
    if (!auctionInfo) return true;

    const endAt = Number(auctionInfo.end_time) * 1000;
    return endAt < new Date().getTime();
  }, [auctionInfo]);

  return (
    <div className="mt-5 bg-[#281A31]">
      <CloseCountdown />
      <BidProgress />
      {isFinished ? <Finished /> : <BidAction />}
    </div>
  );
}

function Finished() {
  return (
    <div className="pt-6 pb-5 px-5 flex items-center justify-center">
      <span className="text-white text-2xl font-medium">Auction Aborted</span>
    </div>
  );
}
