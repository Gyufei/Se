import { truncateAddr } from "@/lib/utils/web3";
import Image from "next/image";

export default function NFTInfo() {
  const nftId = "8857";
  const nftSeriesName = "Cryptopunks";
  const seller = "0x1234567890abcdef1234567890abcdef12345678";

  return (
    <>
      <div className="flex items-center space-x-[5px] font-medium">
        <div className="h-[26px] w-[26px] border border-[#ffffff20] box-border p-[2px]">
          <Image src="/images/mock-nft.png" width={20} height={20} alt="eth" />
        </div>
        <span className="text-sm text-white">{nftSeriesName}</span>
        <div className="h-5 text-xs text-white rounded-full bg-[#71458E] px-2 flex items-center">
          1 NFT(S)
        </div>
      </div>
      <div className="mt-5 text-white text-[30px]">
        <span>
          {nftSeriesName} #{nftId}
        </span>
      </div>
      <div className="mt-[10px] text-xl text-white opacity-60">
        Seller: {truncateAddr(seller)}
      </div>
    </>
  );
}
