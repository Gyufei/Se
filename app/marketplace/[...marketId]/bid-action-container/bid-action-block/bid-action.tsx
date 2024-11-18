import { useState } from "react";
import AmountInput from "./amount-input";
import BidBtn from "./bid-btn";
import RaeToken from "@/app/_common/rae-token";

const balance = 9.00655;

export default function BidAction() {
  const [bidAmount, setBidAmount] = useState(0);

  const handleInput = (value: string) => {
    setBidAmount(Number(value));
  };

  function handleBuyMax() {
    setBidAmount(balance);
  }

  return (
    <div className="pt-6 pb-5 px-5">
      <div className="flex justify-between">
        <span className="text-base font-medium text-white">Bid Amount</span>
        <span>
          <span className="text-white opacity-60 text-xs font-medium">
            Balance:
          </span>
          <span className="text-white text-xs font-medium inline-block ml-1">
            {balance} RAE
          </span>
        </span>
      </div>

      <div className="flex justify-between items-center mt-5">
        <AmountInput amount={bidAmount} setAmount={handleInput} />

        <div className="flex items-center">
          <div
            onClick={handleBuyMax}
            className="cursor-pointer text-white text-sm font-medium underline decoration-green underline-offset-4"
          >
            Buy max
          </div>
          <RaeToken />
        </div>
      </div>

      <BidBtn />
    </div>
  );
}
