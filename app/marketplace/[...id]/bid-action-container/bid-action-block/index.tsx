import BidAction from "./bid-action";
import BidProgress from "./bid-progress";
import CloseCountdown from "./close-countdown";

export default function BidActionBlock() {
  return (
    <div className="mt-5 bg-[#281A31]">
      <CloseCountdown />
      <BidProgress />
      <BidAction />
    </div>
  );
}
