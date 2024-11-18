"use client";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useState } from "react";

export default function CollectionInfo() {
  function handleShowMore() {}

  function handleXClick() {}

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-[128px] h-[128px] border-2 border-[#ffffff40] px-1">
          <Image
            src="/images/mock-nft.png"
            width={120}
            height={120}
            alt="NFT"
          />
        </div>

        <div className="flex flex-col justify-between ml-9">
          <h1 className="text-white text-[30px] leading-[38px] font-bold">
            TESSERA
          </h1>
          <div className="flex items-center mt-[5px]">
            <span className="text-white text-base opacity-80">
              Here is an explanation and introduction.
            </span>
            <span
              onClick={handleShowMore}
              className="inline-block ml-1 cursor-pointer text-white text-sm font-medium underline decoration-green underline-offset-4"
            >
              Show more
            </span>
          </div>
          <div className="flex items-center space-x-[10px] mt-[25px]">
            <HoverIcon onClick={handleXClick} src="/icons/earth.svg" />
            <HoverIcon onClick={handleXClick} src="/icons/x.svg" />
            <HoverIcon onClick={handleXClick} src="/icons/discord.svg" />
            <HoverIcon onClick={handleXClick} src="/icons/tg.svg" />
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
