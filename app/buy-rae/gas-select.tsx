import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils/common";

const GasOptions = [0.1, 0.05, 0.01];

export default function GasSelect({
  gas,
  setGas,
}: {
  gas: number;
  setGas: (_gas: number) => void;
}) {
  const [gasPopOpen, setGasPopOpen] = useState(false);

  function handleSelectGas(g: number) {
    setGas(g);
    setGasPopOpen(false);
  }

  return (
    <Popover open={gasPopOpen} onOpenChange={(isOpen) => setGasPopOpen(isOpen)}>
      <PopoverTrigger className="flex items-center">
        <Image src="/icons/gas.svg" width={16} height={16} alt="gas" />
        <span className="inline-block ml-1 mr-2 text-white opacity-60 text-sm font-medium">
          {gas}
        </span>
        <Image
          src="/icons/bracket-up.svg"
          width={16}
          height={16}
          alt="arrow"
          className={cn("opacity-60", !gasPopOpen && "rotate-180")}
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-[103] flex w-[80px] flex-col items-stretch rounded-none border-0 bg-[#382743] space-y-[5px] p-[5px]"
      >
        {GasOptions.map((g) => (
          <div
            className="flex h-10 cursor-pointer items-center rounded-none px-4 text-sm text-white hover:bg-[#281A31]"
            onClick={() => handleSelectGas(g)}
            key={g}
          >
            {g}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
