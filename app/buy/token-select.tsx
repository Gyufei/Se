import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IToken } from "@/lib/types/token";
import { cn } from "@/lib/utils/common";

const tokens = [
  {
    symbol: "RAE",
    logoURI: "/icons/rae.svg",
  },
  {
    symbol: "ETH",
    logoURI: "/icons/rae.svg",
  },
  {
    symbol: "BTC",
    logoURI: "/icons/rae.svg",
  },
] as Array<IToken>;

export default function TokenSelect({
  token,
  setToken,
}: {
  token: IToken;
  setToken: (_t: IToken) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setPopOpen(false);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center justify-center rounded-none bg-[#382743] p-2">
          {token && (
            <>
              <Image
                width={18}
                height={18}
                src={token?.logoURI}
                alt="selected token"
                className="mr-2 rounded-full"
              ></Image>
              <div className="pr-[4px] text-sm leading-5 text-black">
                {token?.symbol}
              </div>
              <Image
                src="/icons/arrow-up.svg"
                width={16}
                height={16}
                alt="arrow"
                className={cn(popOpen ? "rotate-180" : "")}
              />
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-[103] flex w-[112px] flex-col items-stretch rounded-none border-0 bg-[#382743] space-y-[5px] p-[5px] shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
      >
        {tokens.map((t) => (
          <div
            key={t.symbol}
            onClick={() => handleSelectToken(t)}
            className="flex h-10 cursor-pointer items-center rounded-none px-4 text-sm text-white hover:bg-[#281A31]"
          >
            <Image
              width={18}
              height={18}
              src={t.logoURI}
              alt="token option"
              className="mr-2 rounded-full"
            ></Image>
            {t.symbol}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
