"use client";

import { useState } from "react";
import CateTabs, { IPoolStatusTab } from "./pool-status-tabs";
import PoolTable from "./pool-table";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<IPoolStatusTab>("active");

  return (
    <div className="flex min-w-[1440px] overflow-x-auto">
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
