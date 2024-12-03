"use client";

import { useState } from "react";
import CateTabs from "./pool-status-tabs";
import PoolTable from "./pool-table";
import { IPoolStatus } from "@/lib/api/use-pools";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<IPoolStatus>("ACTIVE");

  return (
    <div className="flex min-w-[1440px] max-w-[1920px] mx-auto">
      <div className="my-[50px] flex-1 flex justify-center">
        <div className="w-[902px]">
          <div className="text-white text-xl font-medium">Pools</div>
          <CateTabs status={status} setStatus={setStatus} />
          <PoolTable status={status} />
        </div>
      </div>
      {children}
    </div>
  );
}
