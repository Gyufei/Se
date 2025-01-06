import { cn } from "@/lib/utils/common";
import { formatNumber, formatPercent } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";
import { capitalize, range } from "lodash";
import { useMemo } from "react";
import { IPoolStatus, usePools } from "@/lib/api/use-pools";
import { Skeleton } from "@/components/ui/skeleton";
import { divide } from "safebase";
import { useParams, useRouter } from "next/navigation";
import Empty from "../_common/empty";
import { AddressImg } from "../_common/address-img";
import { escapeHtml } from "@/lib/utils/url";
import { DurationDisplay } from "../_common/duration-display";
import RowMore from "./row-more";
import { useDeviceSize } from "@/lib/common/use-device-size";

export default function PoolTable({ status }: { status: IPoolStatus }) {
  const params = useParams();
  const { data: pools, isPending: isPoolPending } = usePools();
  const router = useRouter();
  const { isMobileSize } = useDeviceSize();

  const showList = useMemo(() => {
    if (!pools) return [];

    return pools?.filter((pool) => pool.status === status);
  }, [status, pools]);

  const selectedPool = params.poolAddress;

  function handlePoolClick(poolAddress: string) {
    if (!isMobileSize) {
      router.push(`/pools/${poolAddress}`);
    }
  }

  const mbLabelText = "text-sm text-[#ffffff60]";

  return (
    <div className="mt-[30px] w-full pb-14 md:mt-10 md:pb-0">
      <div className="mb-[15px] hidden px-5 text-left text-sm font-medium leading-[18px] text-white opacity-60 md:flex">
        <div className="w-[190px]">Pool</div>
        <div className="w-[120px]">Total Staked</div>
        <div className="w-[110px]">Created By</div>
        <div className="w-[120px]">Creator Bonus</div>
        <div className="w-[110px]">Delegators</div>
        <div className="w-[65px]">LifeTime</div>
        {status === "ACTIVE" && <div></div>}
      </div>
      {isPoolPending ? (
        range(3).map((i) => <Skeleton key={i} className="mb-[15px] h-[200px] md:h-20 w-full" />)
      ) : showList.length ? (
        showList.map((pool, i) => (
          <div
            className={cn(
              "relative mb-4 flex h-auto cursor-pointer flex-col items-stretch bg-[#281A31] p-4 md:h-20 md:flex-row md:items-center md:p-5",
              selectedPool === pool.address && "border border-green",
            )}
            key={i}
            onClick={() => handlePoolClick(pool.address)}
          >
            <div className="flex justify-between md:justify-start">
              <div className="flex w-[190px] items-center gap-x-[15px] text-sm font-medium text-white">
                <AddressImg className="rounded-full" address={pool.address} width={40} height={40} />
                <div className="flex flex-col items-start space-y-[6px]">
                  <span className="w-[260px] truncate md:w-[130px]">{escapeHtml(pool.name)}</span>
                  <span
                    className={cn(
                      "flex items-center justify-center px-2 text-xs",
                      pool.status === "LIQUIDATING" && "bg-[#EF466F15] text-red",
                      pool.status === "ACTIVE" && "bg-[#AAED4A15] text-green",
                    )}
                  >
                    {capitalize(pool.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between md:hidden">
              <div className="flex flex-col">
                <div className={cn(mbLabelText)}>Total Staked</div>
                <div>{formatNumber(pool.total_staked)} RAE</div>
              </div>
              <div className="flex flex-col">
                <div className={cn(mbLabelText)}>Created By</div>
                <div>{truncateAddr(pool.creator, [4, 4])}</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between md:hidden">
              <div className="flex flex-col">
                <div className={cn(mbLabelText)}>Creator Bonus</div>
                <div>{formatPercent(divide(pool.creator_bonus, String(10 ** 4)))}</div>
              </div>
              <div className="flex flex-col">
                <div className={cn(mbLabelText)}>Delegators</div>
                <div>{pool.delegator}</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between md:hidden">
              <div className="flex flex-col">
                <div className={cn(mbLabelText)}>LifeTime</div>
                <div>
                  <DurationDisplay time={Number(pool.create_at) * 1000} />
                </div>
              </div>
            </div>

            <div className="hidden w-[120px] md:block">{formatNumber(pool.total_staked)} RAE</div>
            <div className="hidden w-[110px] md:block">{truncateAddr(pool.creator, [4, 4])}</div>
            <div className="hidden w-[120px] md:block">
              {formatPercent(divide(pool.creator_bonus, String(10 ** 4)))}
            </div>
            <div className="hidden w-[110px] md:block">{pool.delegator}</div>
            <div className="hidden w-[65px] text-right md:block">
              <DurationDisplay time={Number(pool.create_at) * 1000} />
            </div>
            {status === "ACTIVE" && <RowMore pool={pool} />}
          </div>
        ))
      ) : (
        <Empty className="mt-[68px] items-center text-2xl" text="No Pools found" />
      )}
    </div>
  );
}
