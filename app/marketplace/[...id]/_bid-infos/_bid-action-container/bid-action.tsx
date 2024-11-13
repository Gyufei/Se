import Image from "next/image";
import { NumericalInput } from "@/components/share/numerical-input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { truncateAddr } from "@/lib/utils/web3";

const balance = 9.00655;
const canBidAsPool = true;
const pools = [
  {
    address: "0x1234567890123456789123456789123456789",
  },
  {
    address: "0x000000000000000000000ffffffffffffffff",
  },
  {
    address: "0x0000000000000000000000000000000000001",
  },
  {
    address: "0x0000000000000000000000000000000000004",
  },
  {
    address: "0x0000000000000000000000000000000000003",
  },
];

export default function BidAction() {
  const [bidAmount, setBidAmount] = useState(0);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

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

      <div className="flex items-center justify-between mt-5 space-x-5">
        {canBidAsPool ? (
          <>
            <button className="bg-green h-12 flex justify-center items-center flex-1 text-[#12021D] text-base font-bold">
              Bid as
            </button>
            <Select
              value={selectedPool || ""}
              onValueChange={(v) => setSelectedPool(v)}
            >
              <SelectTrigger className="flex-1 h-12 bg-[#382743] border-none rounded-none flex justify-center space-x-[5px]">
                <SelectValue placeholder="Select a Pool">
                  <span className="text-white text-base font-medium">
                    Pool: {truncateAddr(selectedPool || "")}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="border-none rounded-none bg-[#382743] p-[5px]">
                {pools.map((pool) => (
                  <SelectItem
                    className="text-white mt-[5px] text-base font-medium hover:bg-[#281A31] data-[state=checked]:bg-[#281A31]"
                    key={pool.address}
                    value={pool.address}
                  >
                    Pool: {truncateAddr(pool.address)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : (
          <button className="bg-green h-12 flex justify-center items-center flex-1 text-[#12021D] text-base font-bold">
            Bid
          </button>
        )}
      </div>
    </div>
  );
}

function AmountInput({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (amount: string) => void;
}) {
  function handleDecrease() {
    if (amount > 0) {
      setAmount(String(amount - 1));
    }
  }

  function handleIncrease() {
    setAmount(String(amount + 1));
  }

  return (
    <div className="flex items-center space-x-3">
      <div
        onClick={handleDecrease}
        className="cursor-pointer h-12 w-12 flex items-center justify-center border border-[#ffffff20]"
      >
        <Image src="/icons/minus.svg" width={48} height={48} alt="minus" />
      </div>
      <div>
        <NumericalInput
          className="h-12 w-[100px] rounded-none border border-[#ffffff20] text-white text-center focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
          placeholder="0"
          value={amount}
          onUserInput={(v) => setAmount(v)}
        />
      </div>
      <div
        onClick={handleIncrease}
        className="cursor-pointer h-12 w-12 flex items-center justify-center border border-[#ffffff20]"
      >
        <Image src="/icons/plus.svg" width={48} height={48} alt="minus" />
      </div>
    </div>
  );
}
