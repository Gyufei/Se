import { IPoolStatus } from "@/lib/api/use-pools";
import { capitalize } from "lodash";
import Link from "next/link";

const TabClx =
  "flex items-center cursor-pointer h-10 px-5 text-white data-[state=inactive]:bg-transparent transition-all text-xs rounded-none data-[state=active]:bg-[#382544] data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60";

const tabs: Array<IPoolStatus> = ["ACTIVE", "LIQUIDATING"];

export default function PoolStatusTabs({
  status,
  setStatus,
}: {
  status: IPoolStatus;
  setStatus: (v: IPoolStatus) => void;
}) {
  return (
    <div className="w-full flex justify-between items-end p-0 space-x-3 -pb-1 border-b-[2px] rounded-none border-[#382544]">
      <div className="flex">
        <div
          data-state={status === tabs[0] ? "active" : "inactive"}
          className={TabClx}
          onClick={() => setStatus(tabs[0])}
        >
          {capitalize(tabs[0])}
        </div>
        <div
          data-state={status === tabs[1] ? "active" : "inactive"}
          className={TabClx}
          onClick={() => setStatus(tabs[1])}
        >
          {capitalize(tabs[1])}
        </div>
      </div>
      <Link href="/pools/create">
        <button className="mb-[15px] flex items-center justify-center h-10 px-5 bg-green text-sm text-[#12021D] rounded-none font-bold">
          Create Pool +
        </button>
      </Link>
    </div>
  );
}
