"use client";

import { useState } from "react";
import CateTabs from "./pool-status-tabs";
import PoolTable from "./pool-table";
import { IPoolStatus } from "@/lib/api/use-pools";
import { useDeviceSize } from "@/lib/common/use-device-size";
import { useSelectedLayoutSegments } from "next/navigation";

export default function PoolsContent() {
  const [status, setStatus] = useState<IPoolStatus>("ACTIVE");

  const segments = useSelectedLayoutSegments();
  const { isMobileSize } = useDeviceSize();
  const isPoolsTable = segments.length === 0;

  if (isMobileSize && !isPoolsTable) return null;

  return (
    <div className="my-0 flex flex-1 justify-center md:my-[50px]">
      <div className="w-full md:w-[902px]">
        <div className="hidden text-xl font-medium text-white md:block">Pools</div>
        <CateTabs status={status} setStatus={setStatus} />
        <PoolTable status={status} />
      </div>
    </div>
  );
}
