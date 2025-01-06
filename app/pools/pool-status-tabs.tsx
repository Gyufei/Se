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
    <div className="flex w-full items-end justify-between space-x-0 rounded-none border-b-[2px] border-[#382544] p-0 md:space-x-3">
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
      <div className="fixed bottom-0 left-0 right-0 z-10 h-[56px] w-screen bg-[#281A31] px-4 md:static md:z-0 md:h-auto md:w-auto md:bg-transparent md:px-0">
        <Link href="/pools/create" className="flex h-full items-center justify-end">
          <button className="mb-0 flex h-10 items-center justify-center rounded-none bg-green px-5 text-sm font-bold text-[#12021D] md:mb-[15px]">
            Create Pool +
          </button>
        </Link>
      </div>
    </div>
  );
}
