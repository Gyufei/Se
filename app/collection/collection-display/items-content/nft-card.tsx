import { cn } from "@/lib/utils/common";
import { capitalize } from "lodash";
import Image from "next/image";
import { useState } from "react";

const nftInfo = {
  imgSrc: "/images/mock-nft.png",
  name: "Tessera 0210",
  status: "listed",
};

export default function NFTCard() {
  const [isHover, setIsHover] = useState(false);

  const isListed = nftInfo.status === "listed";
  const isVault = nftInfo.status === "vault";

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-[200px] h-[260px] overflow-hidden bg-[#1D0E27] border-2 border-transparent hover:border-green relative"
    >
      <Image
        src={nftInfo.imgSrc}
        width={200}
        height={200}
        alt="nft"
        className={cn(
          " transition-all duration-500 ease-in-out",
          isHover && "scale-[1.15]",
        )}
      />
      <div
        className={cn(
          "h-[60px] pt-5 px-[15px] bg-[#1D0E27] pb-[15px] absolute w-full bottom-0 transition-all duration-500 ease-in-out",
          isHover && "h-[100px]",
        )}
      >
        <div className="flex justify-between items-center">
          <span>{nftInfo.name}</span>
          {(isListed || isVault) && (
            <div
              className={cn(
                "h-5 flex px-2 items-center text-white text-xs",
                isListed && "bg-[#71458E]",
                isVault && "bg-[#DB734A]",
              )}
            >
              {capitalize(nftInfo.status)}
            </div>
          )}
        </div>
        <>
          {isHover && (
            <>
              {isListed && <AddToBagBtn />}
              {isVault && <ViewVaultBtn />}
            </>
          )}
        </>
      </div>
    </div>
  );
}

const BtnClx =
  "bg-green w-full flex items-center justify-center h-8 text-[#12021D] mt-[10px] text-xs font-bold";

function AddToBagBtn() {
  return <button className={BtnClx}>Add to Quick Bag</button>;
}

function ViewVaultBtn() {
  return <button className={BtnClx}>View Vault</button>;
}
