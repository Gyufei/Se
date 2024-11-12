"use client";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { use } from "react";

export default function NftPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const nftParams = use(params);
  const nftId = nftParams.id;
  console.log(nftId);

  return (
    <div className="flex ml-[140px] mr-6">
      <div className="mt-6 flex-1">
        <PathBreadcrumb paths={["Lucky Market", "Cyptopunks No. 999"]} />
        <Image
          className="mt-5"
          src="/images/mock-nft-placeholder.png"
          width={580}
          height={580}
          alt="nft"
        />
        <NftTabs />
      </div>
    </div>
  );
}

function PathBreadcrumb({ paths }: { paths: string[] }) {
  return (
    <div className="flex items-center">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return (
          <div
            key={index}
            className={cn(
              "flex items-center text-xl text-white",
              isLast ? "opacity-100" : "opacity-60",
            )}
          >
            <div>{path}</div>
            {!isLast && <div className="mx-2">/</div>}
          </div>
        );
      })}
    </div>
  );
}

function NftTabs() {
  return <div className="flex mt-6"></div>;
}
