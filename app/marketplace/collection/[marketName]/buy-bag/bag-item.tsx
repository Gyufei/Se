import Image from "next/image";
import { useState } from "react";
import { INFT } from "@/lib/api/use-market-nfts";
import { formatNumberWithUnit } from "@/lib/utils/number";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { multiply } from "safebase";
import { Skeleton } from "@/components/ui/skeleton";

export default function BagItem({
  nft,
  onRemove,
}: {
  nft: INFT;
  onRemove: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const { data: raePrice, isPending: isRaePricePending } = useRaePrice();

  const priceValue = multiply(nft.price, raePrice?.price);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex justify-between items-center p-3 hover:bg-[rgba(153,161,189,0.08)] rounded-xl transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center">
        <Image src={nft.token_uri} width={56} height={56} alt="nft" />
        <div className="ml-[15px]">
          <span className="text-white text-base font-medium">
            {nft.market_name} #{nft.token_id}
          </span>
          <div className="h-5 w-fit mt-[10px] px-3 border border-[#71458E] text-[#71458E] text-xs flex items-center justify-center">
            x1
          </div>
        </div>
      </div>
      {isHover ? (
        <button
          className="bg-[#ffffff90] px-2 rounded-lg flex items-center justify-center h-8 text-[#12021D] mt-[10px] text-xs font-bold"
          onClick={onRemove}
        >
          Remove
        </button>
      ) : (
        <div className="flex flex-col items-end">
          {isRaePricePending ? (
            <>
              <Skeleton className="w-20 h-4 my-1" />
              <Skeleton className="w-16 h-[14px] my-[3px] mt-[10px]" />
            </>
          ) : (
            <>
              <div className="text-base text-white font-medium">
                {nft.price} RAE
              </div>
              <div className="text-sm mt-[10px] text-white opacity-60">
                ${formatNumberWithUnit(priceValue)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
