import { useState } from "react";
import SelectPoolPop from "../../../../_common/select-pool-pop";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";

const canBidAsPool = true;

export default function BidBtn() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  function handleBid() {}

  return (
    <div className="flex items-center justify-between mt-5 space-x-5">
      {canBidAsPool ? (
        <>
          <button className="bg-green h-12 flex justify-center items-center flex-1 text-[#12021D] text-base font-bold">
            Bid as
          </button>
          <SelectPoolPop
            selectedPool={selectedPool}
            setSelectedPool={setSelectedPool}
          />
        </>
      ) : (
        <ShouldConnectBtn className="w-full" onClick={handleBid}>
          Bid
        </ShouldConnectBtn>
      )}
    </div>
  );
}
