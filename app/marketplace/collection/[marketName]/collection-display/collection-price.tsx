"use client";

import { formatNumberWithUnit, formatPercent } from "@/lib/utils/number";
import { useCollectionPageContext } from "../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import { divide, multiply } from "safebase";
import { useMemo } from "react";

const valueTextClx = "text-white font-medium text-sm md:text-xl";
const labelTextClx = "text-xs text-white opacity-60 leading-[18px] mt-[5px] font-medium md:text-sm";

export default function CollectionPrice() {
  const { marketInfo, marketNfts, isMarketPending, isNftsPending } = useCollectionPageContext();

  const price = marketInfo?.guide_price || "0";
  const items = marketNfts?.length || "0";
  const totalVol = multiply(price, String(items));

  const listedPercent = useMemo(() => {
    if (!marketNfts?.length) return "0";

    const listed = marketNfts?.filter((nft) => nft.status === "LISTED").length;
    return divide(String(listed), String(marketNfts?.length));
  }, [marketNfts]);

  const vaultedPercent = useMemo(() => {
    if (!marketNfts?.length) return "0";

    const vaulted = marketNfts?.filter((nft) => nft.status === "VAULTED").length;
    return divide(String(vaulted), String(marketNfts?.length));
  }, [marketNfts]);

  return (
    <div className="mt-9 flex items-center justify-between md:justify-start md:space-x-[60px]">
      <div>
        {isMarketPending ? (
          <Skeleton className="my-1 h-[20px] w-[80px]" />
        ) : (
          <div className={valueTextClx}>{price} RAE</div>
        )}
        <div className={labelTextClx}>Price</div>
      </div>
      <div>
        {isMarketPending || isNftsPending ? (
          <Skeleton className="my-1 h-[20px] w-[100px]" />
        ) : (
          <div className={valueTextClx}>{formatNumberWithUnit(totalVol)} RAE</div>
        )}
        <div className={labelTextClx}>Total Volume</div>
      </div>
      <div>
        {isNftsPending ? (
          <Skeleton className="my-1 h-[20px] w-[80px]" />
        ) : (
          <div className={valueTextClx}>{formatNumberWithUnit(items)}</div>
        )}
        <div className={labelTextClx}>Items</div>
      </div>
      <div>
        {isMarketPending || isNftsPending ? (
          <Skeleton className="my-1 h-[20px] w-[100px]" />
        ) : (
          <div className={valueTextClx}>{formatPercent(listedPercent)}</div>
        )}
        <div className={labelTextClx}>Listed</div>
      </div>
      <div>
        {isMarketPending || isNftsPending ? (
          <Skeleton className="my-1 h-[20px] w-[100px]" />
        ) : (
          <div className={valueTextClx}>{formatPercent(vaultedPercent)}</div>
        )}
        <div className={labelTextClx}>Vaulted</div>
      </div>
    </div>
  );
}
