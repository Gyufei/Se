"use client";
import { useMemo } from "react";
import { usePoolInfo } from "@/lib/api/use-pool-info";
import { Skeleton } from "@/components/ui/skeleton";
import { escapeHtml } from "@/lib/utils/url";

export default function PoolName({ poolAddress }: { poolAddress: string }) {
  const { data: pool, isPending: isPoolInfoPending } = usePoolInfo(poolAddress);

  const poolName = useMemo(() => {
    return escapeHtml(pool?.base.name || "");
  }, [pool]);

  return (
    // <div className="text-[30px] font-medium text-white pb-5 px-6 border-b-2 border-[#ffffff10]">
    <div className="flex h-14 items-center justify-center border-b-0 text-[18px] font-bold text-white md:h-auto md:justify-start md:border-b-2 md:border-[#ffffff10] md:px-6 md:pb-5 md:text-[30px] md:font-medium">
      <div className="flex items-center">
        <div className="">Pool:</div>
        {isPoolInfoPending ? (
          <Skeleton className="my-2 ml-2 mt-[10px] h-6 w-[100px]" />
        ) : (
          <div className="ml-2 truncate pr-6">{poolName}</div>
        )}
      </div>
    </div>
  );
}
