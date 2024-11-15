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
    imgSrc: "/icons/rae.svg",
  },
  {
    symbol: "ETH",
    imgSrc: "/icons/rae.svg",
  },
  {
    symbol: "BTC",
    imgSrc: "/icons/rae.svg",
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
      <PopoverTrigger className="h-10 flex w-[112px] cursor-pointer items-center justify-center rounded-none bg-[#382743]">
        {token && (
          <>
            <Image
              width={18}
              height={18}
              src={token?.imgSrc}
              alt="selected token"
              className="mr-2 rounded-full"
            ></Image>
            <div className="min-w-[30px] pr-[4px] text-sm leading-5 text-white">
              {token?.symbol}
            </div>
            <Image
              src="/icons/bracket-up.svg"
              width={16}
              height={16}
              alt="arrow"
              className={cn(!popOpen && "rotate-180")}
            />
          </>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[112px] flex-col items-stretch rounded-none border-0 bg-[#382743] space-y-[5px] p-[5px]"
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
              src={t.imgSrc}
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
