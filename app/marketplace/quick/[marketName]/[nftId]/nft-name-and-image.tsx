"use client";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export function NFTNameAndImage({
  name,
  img,
  isPending,
}: {
  name: string;
  img: string;
  isPending: boolean;
}) {
  if (isPending) {
    return (
      <>
        <Skeleton className="w-full h-5 mb-2 mt-14" />
        <Skeleton className="w-full mt-5 h-[580px]" />
      </>
    );
  }

  return (
    <>
      <div className="text-white text-xl font-medium mt-12">{name}</div>
      <div className="mt-5">
        <Image src={img} width={580} height={580} alt="nft" />
      </div>
    </>
  );
}
