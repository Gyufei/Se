import { cn } from "@/lib/utils/common";
import { formatPercent } from "@/lib/utils/number";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { truncateAddr } from "@/lib/utils/web3";
import { formatDistanceToNowStrict } from "date-fns";
import { upperCase } from "lodash";
import Image from "next/image";
import { IPoolStatusTab } from "./pool-status-tabs";
import { useMemo } from "react";

const poolList = [
  {
    id: 1,
    imgSrc: "/images/mock-nft.png",
    name: "Milady No. 999",
    status: "active",
    capacity: 2.342,
    createBy: "0x1234567890abcdef",
    createBonus: 0.12,
    delegators: 123,
    lifeTime: new Date().getTime() - 1000 * 60 * 60 * 3,
  },
  {
    id: 2,
    imgSrc: "/images/mock-nft.png",
    name: "Milady No. 999",
    status: "active",
    capacity: 2.342,
    createBy: "0x1234567890abcdef",
    createBonus: 0.12,
    delegators: 123,
    lifeTime: new Date().getTime() - 1000 * 60 * 60 * 3,
  },
  {
    id: 3,
    imgSrc: "/images/mock-nft.png",
    name: "Milady No. 999",
    status: "closed",
    capacity: 2.342,
    createBy: "0x1234567890abcdef",
    createBonus: 0.12,
    delegators: 123,
    lifeTime: new Date().getTime() - 1000 * 60 * 60 * 3,
  },
  {
    id: 4,
    imgSrc: "/images/mock-nft.png",
    name: "Milady No. 999",
    status: "closed",
    capacity: 2.342,
    createBy: "0x1234567890abcdef",
    createBonus: 0.12,
    delegators: 123,
    lifeTime: new Date().getTime() - 1000 * 60 * 60 * 3,
  },
];

export default function PoolTable({ status }: { status: IPoolStatusTab }) {
  const showList = useMemo(() => {
    return poolList.filter((pool) => pool.status === status);
  }, [status]);

  return (
    <div className="w-full mt-10">
      <div className="text-white text-left leading-[18px] text-sm font-medium opacity-60 flex px-5 mb-[15px]">
        <div className="w-[190px]">Pool</div>
        <div className="w-[100px]">Capacity</div>
        <div className="w-[110px]">Created By</div>
        <div className="w-[130px]">Created Bonus</div>
        <div className="w-[120px]">Delegators</div>
        <div className="w-[65px]">LifeTime</div>
        <div></div>
      </div>
      {showList.map((pool, i) => (
        <div
          className="h-20 bg-[#281A31] p-5 flex items-center mb-[15px]"
          key={i}
        >
          <div className="w-[190px] flex items-center gap-x-[15px] text-sma font-medium text-white">
            <Image
              src={pool.imgSrc}
              width={40}
              height={40}
              className="rounded-full"
              alt={pool.name}
            />
            <div className=" flex flex-col items-start space-y-[6px]">
              <span>{pool.name}</span>
              <span
                className={cn(
                  "flex items-center justify-center px-2 text-xs",
                  pool.status === "closed" && "bg-[#EF466F15] text-red",
                  pool.status === "active" && "bg-[#AAED4A15] text-green",
                )}
              >
                {upperCase(pool.status)}
              </span>
            </div>
          </div>
          <div className="w-[100px]">{pool.capacity} RAE</div>
          <div className="w-[110px]">{truncateAddr(pool.createBy, [4, 4])}</div>
          <div className="w-[130px]">{formatPercent(pool.createBonus)}</div>
          <div className="w-[120px]">{pool.delegators}</div>
          <div className="w-[65px] text-right">
            {replaceTimeUnitToSingleChar(
              formatDistanceToNowStrict(pool.lifeTime),
            )}
          </div>
          <div className="flex-1 cursor-pointer items-center text-center underline decoration-green underline-offset-4">
            Delegate
          </div>
        </div>
      ))}
    </div>
  );
}
