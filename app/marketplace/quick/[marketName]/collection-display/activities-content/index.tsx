import Image from "next/image";
import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { truncateAddr } from "@/lib/utils/web3";
import EventSelect from "./event-select";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";

const nftList = [
  {
    id: 1,
    imgSrc: "/images/mock-nft.png",
    name: "NFT 1",
    price: 100,
    event: "Event 1",
    by: "0x1234567890abcdef1234567890abcdef12345678",
    time: new Date().getTime() - 1000 * 60 * 60 * 3,
  },
  {
    id: 2,
    imgSrc: "/images/mock-nft.png",
    name: "NFT 2",
    price: 200,
    event: "Event 2",
    by: "0x1234567890abcdef1234567890abcdef12345678",
    time: new Date().getTime() - 1000 * 60 * 60 * 4,
  },
];

export default function ActivitiesContent() {
  const [filterEvents, setFilterEvents] = useState([]);

  return (
    <>
      <div className="flex items-center px-5 text-sm text-white opacity-60 mb-[20px] mt-[38px]">
        <div className="w-[210px]">Item</div>
        <div className="w-[160px]">Price</div>
        <div className="w-[160px]">By</div>
        <div className="w-[160px]">
          <EventSelect events={filterEvents} setEvents={setFilterEvents} />
        </div>
        <div className="w-[130px]"></div>
      </div>
      {nftList.map((nft) => (
        <div
          key={nft.id}
          className="flex bg-[#281A31] px-5 py-4 items-center text-sm text-white mb-[15px]"
        >
          <div className="w-[210px] flex items-center">
            <Image
              src={nft.imgSrc}
              alt=""
              width={30}
              height={30}
              className="mr-[25px]"
            />
            <span>{nft.name}</span>
          </div>
          <div className="w-[160px]">{nft.price} RAE</div>
          <div className="w-[160px]">{truncateAddr(nft.by)}</div>
          <div className="w-[160px]">{nft.event}</div>
          <div className="w-[130px]">
            {replaceTimeUnitToSingleChar(formatDistanceToNowStrict(nft.time))}
          </div>
        </div>
      ))}
    </>
  );
}
