"use client";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useQuickPageContext } from "../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "lodash";

export default function CollectionInfo() {
  const { marketInfo, isMarketPending } = useQuickPageContext();

  function handleOpen(link: string | undefined) {
    if (!link) return;
    window.open(link, "_blank");
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-[128px] h-[128px] border-2 border-[#ffffff40] px-1">
          {isMarketPending ? (
            <Skeleton className="w-[120px] h-[120px]" />
          ) : (
            <Image
              src="/images/mock-nft.png"
              width={120}
              height={120}
              alt="NFT"
            />
          )}
        </div>

        <div className="flex flex-col justify-between ml-9">
          {isMarketPending ? (
            <Skeleton className="w-[200px] h-[30px] my-2" />
          ) : (
            <h1 className="text-white text-[30px] leading-[38px] font-bold">
              {marketInfo?.market_name}
            </h1>
          )}
          <div className="flex items-center mt-[5px]">
            <DescDisplay
              marketDesc={marketInfo?.description}
              isMarketPending={isMarketPending}
            />
          </div>
          <div className="flex items-center space-x-[10px] mt-[25px]">
            {isMarketPending ? (
              range(4).map((i) => <Skeleton key={i} className="w-8 h-8" />)
            ) : (
              <>
                <HoverIcon
                  onClick={() => handleOpen(marketInfo?.social_media?.website)}
                  src="/icons/earth.svg"
                />
                <HoverIcon
                  onClick={() => handleOpen(marketInfo?.social_media?.twitter)}
                  src="/icons/x.svg"
                />
                <HoverIcon
                  onClick={() => handleOpen(marketInfo?.social_media?.discord)}
                  src="/icons/discord.svg"
                />
                <HoverIcon
                  onClick={() => handleOpen(marketInfo?.social_media?.telegram)}
                  src="/icons/tg.svg"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function HoverIcon({ src, onClick }: { src: string; onClick: () => void }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      className="w-8 h-8 bg-[#281A31] flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={src}
        width={20}
        height={20}
        alt="earth"
        className={cn(hover ? "opacity-100" : "opacity-60")}
      />
    </div>
  );
}

function DescDisplay({
  marketDesc,
  isMarketPending,
}: {
  marketDesc: string | undefined;
  isMarketPending: boolean;
}) {
  const isCollapse = marketDesc && marketDesc.length > 100;
  const [showMore, setShowMore] = useState(false);

  function handleCollapse() {
    setShowMore(!showMore);
  }

  const displayDesc = useMemo(() => {
    if (!marketDesc) return "";

    if (!isCollapse) return marketDesc;

    return showMore ? marketDesc : marketDesc.slice(0, 100) + "...";
  }, [marketDesc, isCollapse, showMore]);

  if (isMarketPending) {
    return <Skeleton className="w-[300px] h-[20px]" />;
  }

  return (
    <>
      <span className="text-white text-base opacity-80">{displayDesc}</span>
      {isCollapse && (
        <span
          onClick={handleCollapse}
          className="inline-block ml-1 cursor-pointer text-white text-sm font-medium underline decoration-green underline-offset-4"
        >
          {showMore ? "Show less" : "Show more"}
        </span>
      )}
    </>
  );
}
