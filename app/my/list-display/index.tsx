"use client";
import { useState } from "react";
import { NFTOwnByType, PersonalAndPoolBtns } from "./personal-and-pool-btns";
import NftList from "./nft-list";

export default function NftListDisplay() {
  const [type, setType] = useState<NFTOwnByType>("personal");

  return (
    <div className="mt-[45px] mb-[60px] flex flex-1 justify-center">
      <div className="w-[650px]">
        <div className="text-white text-4xl font-medium">
          My NFT Collections
        </div>
        <PersonalAndPoolBtns
          type={type}
          setType={setType}
          typeNumbers={{
            personal: 40,
            pool: 20,
          }}
        />
        <NftList type={type} />
      </div>
    </div>
  );
}
