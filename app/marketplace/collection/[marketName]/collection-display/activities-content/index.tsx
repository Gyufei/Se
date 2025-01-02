import { useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { truncateAddr } from "@/lib/utils/web3";
import EventSelect, { IEventType } from "./event-select";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { IActivity, useMarketActivity } from "@/lib/api/use-market-activity";
import { useCollectionPageContext } from "../../page-context";
import { capitalize, range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import NftFallbackImage from "@/app/_common/nft-fallback-image";

export default function ActivitiesContent() {
  const { marketInfo } = useCollectionPageContext();

  const { data: activities, isPending: isActivitiesPending } = useMarketActivity(marketInfo?.market_name);

  const [filterEvents, setFilterEvents] = useState<IEventType[]>([]);

  const displayActivities = useMemo(() => {
    if (!activities) return [];

    if (filterEvents.length) {
      return activities.filter((act) => filterEvents.includes(act.event));
    }

    return activities;
  }, [activities, filterEvents]);

  return (
    <>
      <EventSelect className="mb-[16px] mt-[22px] flex md:hidden" events={filterEvents} setEvents={setFilterEvents} />
      <div className="mb-[20px] mt-[38px] hidden items-center px-5 text-sm text-white opacity-60 md:flex">
        <div className="w-[210px]">Item</div>
        <div className="w-[160px]">Price</div>
        <div className="w-[160px]">By</div>
        <div className="w-[160px]">
          <EventSelect events={filterEvents} setEvents={setFilterEvents} />
        </div>
        <div className="w-[130px]"></div>
      </div>
      <div className="no-scroll-bar max-h-[600px] min-h-[270px] overflow-y-auto overflow-x-hidden">
        {isActivitiesPending
          ? range(3).map((i) => <Skeleton className="mb-4 h-[210px] w-full md:h-16" key={i} />)
          : displayActivities.map((activity, index) => (
              <ActivityItem key={activity.token_id + activity.event + index} activity={activity} />
            ))}
      </div>
    </>
  );
}

function ActivityItem({ activity }: { activity: IActivity }) {
  const { marketNfts, isNftsPending } = useCollectionPageContext();

  const nft = marketNfts?.find((nft) => nft.token_id === activity.token_id);
  const actTime = Number(activity?.update_at || 0) * 1000;

  const mbLabelText = "text-sm text-[#ffffff60]";

  return (
    <div className="mb-4 flex flex-col bg-[#281A31] px-4 py-4 text-[18px] text-white md:flex-row md:items-center md:px-5 md:text-sm">
      <div className="flex w-full items-center md:w-[210px]">
        {isNftsPending || !nft ? (
          <>
            <Skeleton className="mr-4 h-[40px] w-[40px] md:mr-[25px] md:h-[30px] md:w-[30px]" />
            <Skeleton className="h-[20px] w-[60px]" />
          </>
        ) : (
          <>
            <NftFallbackImage
              src={nft.token_uri}
              alt=""
              width={40}
              height={40}
              className="mr-4 rounded-full md:mr-[25px] md:rounded-none"
            />
            <span>
              {nft?.market_name} {nft?.token_id}
            </span>
          </>
        )}
      </div>
      <div className="hidden w-[160px] md:block">{activity.price} RAE</div>
      <div className="hidden w-[160px] md:block">{truncateAddr(activity.by)}</div>
      <div className="hidden w-[160px] md:block">{capitalize(activity.event)}</div>
      <div className="hidden w-[130px] md:block">{replaceTimeUnitToSingleChar(formatDistanceToNowStrict(actTime))}</div>

      <div className="mt-5 flex justify-between md:hidden">
        <div className="flex flex-col items-start">
          <div className={mbLabelText}>Price</div>
          <div>{activity.price} RAE</div>
        </div>
        <div className="flex flex-col items-end">
          <div className={mbLabelText}>By</div>
          <div>{truncateAddr(activity.by)}</div>
        </div>
      </div>

      <div className="mt-5 flex justify-between md:hidden">
        <div className="flex flex-col items-start">
          <div className={mbLabelText}>Event</div>
          <div>{capitalize(activity.event)}</div>
        </div>

        <div className="flex flex-col items-end">
          <div className={mbLabelText}>Time</div>
          <div>{replaceTimeUnitToSingleChar(formatDistanceToNowStrict(actTime))}</div>
        </div>
      </div>
    </div>
  );
}
