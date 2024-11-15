"use client";
import { use } from "react";
import { NFTNameAndImage } from "./nft-name-and-image";
import PriceAndOperation from "./price-and-operation";
import ActivityPanel from "./activity-panel";
import DetailsPanel from "./details-panel";
import DescPanel from "./desc-panel";

const nftInfo = {
  name: "Milady No. 999",
  imgSrc: "/images/mock-nft.png",
};

export default function SingleNFT({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const nftParams = use(params);
  const nftId = nftParams.id;
  console.log(nftId);

  return (
    <div className="w-[580px] mx-auto">
      <NFTNameAndImage name={nftInfo.name} img={nftInfo.imgSrc} />
      <PriceAndOperation />
      <ActivityPanel />
      <DetailsPanel />
      <DescPanel />
    </div>
  );
}
