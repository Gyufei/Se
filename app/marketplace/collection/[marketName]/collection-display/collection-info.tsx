"use client";
import { useMemo, useState } from "react";
import { useCollectionPageContext } from "../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressImg } from "@/app/_common/address-img";
import { useDeviceSize } from "@/lib/common/use-device-size";
import { SocialMedia } from "./social-media";

export default function CollectionInfo() {
  const { marketInfo, isMarketPending } = useCollectionPageContext();

  const { isMobileSize } = useDeviceSize();

  return (
    <>
      <div className="flex w-full items-stretch md:items-center">
        <div className="flex h-[80px] w-[80px] items-center justify-center border-2 border-[#ffffff40] px-1 md:h-[128px] md:w-[128px]">
          {isMarketPending ? (
            <Skeleton className="h-[80px] w-[80px] md:h-[120px] md:w-[120px]" />
          ) : (
            <AddressImg
              address={marketInfo?.nft_info?.token_address}
              width={isMobileSize ? 80 : 120}
              height={isMobileSize ? 80 : 120}
            />
          )}
        </div>

        <div className="relative ml-5 mt-1 flex flex-1 flex-col justify-between md:ml-9 md:mt-0">
          {isMarketPending ? (
            <Skeleton className="my-2 h-[30px] w-[200px]" />
          ) : (
            <h1 className="text-[28px] font-bold leading-[38px] text-white md:text-[30px]">
              {marketInfo?.market_name}
            </h1>
          )}
          <div className="mt-[5px]">
            <DescDisplay marketDesc={marketInfo?.description} isMarketPending={isMarketPending} />
          </div>
          <SocialMedia isPending={isMarketPending} marketInfo={marketInfo} />
        </div>
      </div>
    </>
  );
}

function DescDisplay({ marketDesc, isMarketPending }: { marketDesc: string | undefined; isMarketPending: boolean }) {
  const isCollapse = marketDesc && marketDesc.length > 100;
  const [showMore, setShowMore] = useState(false);

  const { isMobileSize } = useDeviceSize();

  function handleCollapse() {
    setShowMore(!showMore);
  }

  const displayDesc = useMemo(() => {
    if (!marketDesc) return "";

    if (!isCollapse) return marketDesc;

    return showMore ? marketDesc : marketDesc.slice(0, isMobileSize ? 40 : 100) + "...";
  }, [marketDesc, isCollapse, showMore, isMobileSize]);

  if (isMarketPending) {
    return <Skeleton className="h-[20px] w-[300px]" />;
  }

  return (
    <>
      <span className="text-sm text-white opacity-80 md:text-base">{displayDesc}</span>
      {isCollapse && (
        <span
          onClick={handleCollapse}
          className="tessera-underline ml-1 inline-block cursor-pointer text-sm font-medium text-white"
        >
          {showMore ? "Show less" : "Show more"}
        </span>
      )}
    </>
  );
}
