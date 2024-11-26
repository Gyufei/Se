import { formatNumberWithUnit } from "@/lib/utils/number";
import Image from "next/image";

const nftInfo = {
  name: "Tessera #0210",
  imgSrc: "/images/mock-nft.png",
  price: 3.83,
  quantity: 1,
};
const raePrice = 2321.23;

export default function BagItem() {
  const priceValue = nftInfo.price * nftInfo.quantity * raePrice;

  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex items-center">
        <Image src={nftInfo.imgSrc} width={56} height={56} alt="nft" />
        <div className="ml-[15px]">
          <span className="text-white text-base font-medium">
            {nftInfo.name}
          </span>
          <div className="h-5 w-fit mt-[10px] px-3 border border-[#71458E] text-[#71458E] text-xs flex items-center justify-center">
            x{nftInfo.quantity}
          </div>
        </div>
      </div>
      <div>
        <div className="text-base text-white font-medium">
          {nftInfo.price} RAE
        </div>
        <div className="text-sm mt-[10px] text-right text-white opacity-60">
          ${formatNumberWithUnit(priceValue)}
        </div>
      </div>
    </div>
  );
}
