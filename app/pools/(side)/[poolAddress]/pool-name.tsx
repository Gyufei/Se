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
    <div className="text-[30px] font-medium text-white pb-5 px-6 border-b-2 border-[#ffffff10]">
      <div className="flex items-center">
        <div className="">Pool:</div>
        {isPoolInfoPending ? (
          <Skeleton className="ml-2 w-[100px] h-6 my-2 mt-[10px]" />
        ) : (
          <div className="ml-2 truncate">{poolName}</div>
        )}
      </div>
    </div>
  );
}
