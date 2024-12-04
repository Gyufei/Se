import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { checkIsSameAddress, truncateAddr } from "@/lib/utils/web3";
import { cn } from "@/lib/utils/common";
import { capitalize } from "lodash";

export interface AddrOptions {
  address: string;
  type: "pool" | "wallet";
}

export default function SelectAddrPop({
  addrs,
  selectedAddr: selectedAddr,
  setSelectedAddr: setSelectedAddr,
  selectedType,
  setSelectedType,
}: {
  addrs: Array<AddrOptions>;
  selectedAddr: string | null;
  setSelectedAddr: (pool: string) => void;
  selectedType: "pool" | "wallet" | null;
  setSelectedType: (type: "pool" | "wallet" | null) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleSelectPool(addr: string) {
    setSelectedAddr(addr);
    setSelectedType(
      addrs.find((p) => checkIsSameAddress(p.address, addr))?.type || null,
    );
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={setPopOpen}>
      <PopoverTrigger className="flex-1 items-center h-12 bg-[#382743] border-none rounded-none flex justify-center space-x-[5px]">
        {selectedAddr ? (
          <span className="text-white text-base font-medium">
            {selectedType && capitalize(selectedType)}:&nbsp;
            {truncateAddr(selectedAddr || "")}
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
        {addrs.map((pool) => (
          <div
            className="text-white cursor-pointer h-10 mt-[5px] flex items-center px-4 text-base font-medium hover:bg-[#281A31] data-[state=checked]:bg-[#281A31]"
            key={pool.address}
            onClick={() => handleSelectPool(pool.address)}
          >
            {capitalize(pool.type)}: {truncateAddr(pool.address)}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
