"use client";
import Image from "next/image";
import { use } from "react";

import PathBreadcrumb from "./path-breadcrumb";
import DetailTabs from "./_detail-tabs";
import BidInfos from "./_bid-infos";

export default function NFTPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const nftParams = use(params);
  const nftId = nftParams.id;
  console.log(nftId);

  return (
    <div className="flex">
      <div className="mt-12 mb-10 flex-1 flex justify-center">
        <div className="w-[580px]">
          <PathBreadcrumb paths={["Lucky Market", "Cyptopunks No. 999"]} />
          <Image
            className="mt-5"
            src="/images/mock-nft.png"
            width={580}
            height={580}
            alt="nft"
          />
          <DetailTabs />
        </div>
      </div>
      <BidInfos />
    </div>
  );
}
