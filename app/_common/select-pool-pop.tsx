import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { truncateAddr } from "@/lib/utils/web3";
import { cn } from "@/lib/utils/common";

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

export default function SelectPoolPop({
  selectedPool,
  setSelectedPool,
}: {
  selectedPool: string | null;
  setSelectedPool: (pool: string) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleSelectPool(addr: string) {
    setSelectedPool(addr);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={setPopOpen}>
      <PopoverTrigger className="flex-1 items-center h-12 bg-[#382743] border-none rounded-none flex justify-center space-x-[5px]">
        {selectedPool ? (
          <span className="text-white text-base font-medium">
            Pool: {truncateAddr(selectedPool || "")}
          </span>
        ) : (
          <span className="text-white opacity-50 text-base font-medium">
            Select a Pool
          </span>
        )}
        <Image
          src="/icons/bracket-up.svg"
          width={16}
          height={16}
          alt="bracket-up"
          className={cn(popOpen ? "rotate-180" : "")}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[220px] border-none rounded-none bg-[#382743] p-[5px]">
        {pools.map((pool) => (
          <div
            className="text-white cursor-pointer h-10 mt-[5px] flex items-center px-4 text-base font-medium hover:bg-[#281A31] data-[state=checked]:bg-[#281A31]"
            key={pool.address}
            onClick={() => handleSelectPool(pool.address)}
          >
            Pool: {truncateAddr(pool.address)}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
