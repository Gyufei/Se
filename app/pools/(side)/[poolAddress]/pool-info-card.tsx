"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { usePoolInfo } from "@/lib/api/use-pool-info";
import { formatPercent } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";

export default function PoolInfoCard({ poolAddress }: { poolAddress: string }) {
  const { data: pool, isPending } = usePoolInfo(poolAddress);

  return (
    <div className="bg-[#281A31] mx-6 mt-6 p-5">
      <div className="flex justify-between">
        <div>
          <div className="text-white opacity-60 text-base font-medium">
            Creator
          </div>
          {isPending ? (
            <Skeleton className="w-[100px] h-6 my-2 mt-[10px]" />
          ) : (
            <div className="text-2xl mt-[10px] text-white font-medium">
              {truncateAddr(pool?.base.creator)}
            </div>
          )}
        </div>

        <div>
          <div className="text-white opacity-60 text-base font-medium">
            Capacity Saturation
          </div>
          {isPending ? (
            <div className="flex items-center">
              <Skeleton className="w-[60px] h-6 my-2 mr-1" />
              /
              <Skeleton className="w-[80px] h-6 my-2 ml-1" />
            </div>
          ) : (
            <div className="text-2xl text-right mt-[10px] text-white font-medium">
              <span>{0}</span>
              <span className="opacity-60"> / {pool?.base.capacity}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-[27px] justify-between">
        <div>
          <div className="text-white opacity-60 text-base font-medium">
            My Acc. Profit
          </div>
          {isPending ? (
            <Skeleton className="w-[100px] h-6 my-2 mt-[10px]" />
          ) : (
            <div className="text-2xl mt-[10px] text-white font-medium">
              {pool?.info.acc_profit} RAE
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <div className="text-white opacity-60 text-base font-medium">
            My Delegated
          </div>
          {isPending ? (
            <div className="flex items-center">
              <Skeleton className="w-[60px] h-6 my-2 mr-1" />
              &nbsp; (<Skeleton className="w-[30px] h-6 my-2 ml-1" />)
            </div>
          ) : (
            <div className="text-2xl text-right mt-[10px] text-white font-medium">
              <span>{pool?.info.delegate_able} RAE&nbsp;</span>
              <span>
                {pool?.info.delegate_able &&
                  `(${formatPercent(pool.info.delegate_able)})`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
