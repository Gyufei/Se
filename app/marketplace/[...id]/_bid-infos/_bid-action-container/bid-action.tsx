import Image from "next/image";
import { useState } from "react";
import AmountInput from "./amount-input";
import BidBtn from "./bid-btn";

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
            className="cursor-pointer text-white text-sm font-medium underline decoration-green"
          >
            Buy max
          </div>
          <div className="flex items-center ml-6 px-5 bg-[#382743] h-12">
            <Image
              src="/icons/rae.svg"
              className="rounded-full"
              width={16}
              height={16}
              alt="rae"
            />
            <span className="text-white text-base inline-block ml-2">RAE</span>
          </div>
        </div>
      </div>

      <BidBtn />
    </div>
  );
}
