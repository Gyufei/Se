"use client";
import PathBreadcrumb from "@/app/_common/path-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export function NFTNameAndImage({
  nftName,
  img,
  marketName,
  isPending,
}: {
  nftName: string | undefined;
  marketName: string | undefined;
  img: string | undefined;
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
      <PathBreadcrumb
        paths={[`${marketName}`, `#${nftName}`]}
        isLoadings={[isPending, isPending]}
        href={[`/marketplace/collection/${marketName}`, null]}
      />
      <div className="mt-5">
        {img ? (
          <Image src={img} width={580} height={580} alt="nft" />
        ) : (
          <Skeleton className="w-full h-[580px]" />
        )}
      </div>
    </>
  );
}
