import Image from "next/image";
import { useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { truncateAddr } from "@/lib/utils/web3";
import EventSelect, { IEventType } from "./event-select";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { IActivity, useMarketActivity } from "@/lib/api/use-market-activity";
import { useCollectionPageContext } from "../../page-context";
import { capitalize, range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivitiesContent() {
  const { marketInfo } = useCollectionPageContext();

  const { data: activities, isPending: isActivitiesPending } =
    useMarketActivity(marketInfo?.market_name);

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
      <div className="flex items-center px-5 text-sm text-white opacity-60 mb-[20px] mt-[38px]">
        <div className="w-[210px]">Item</div>
        <div className="w-[160px]">Price</div>
        <div className="w-[160px]">By</div>
        <div className="w-[160px]">
          <EventSelect events={filterEvents} setEvents={setFilterEvents} />
        </div>
        <div className="w-[130px]"></div>
      </div>
      {isActivitiesPending
        ? range(3).map((i) => (
            <Skeleton className="w-full h-16 mb-[15px]" key={i} />
          ))
        : displayActivities.map((activity, index) => (
            <ActivityItem
              key={activity.token_id + activity.event + index}
              activity={activity}
            />
          ))}
    </>
  );
}

function ActivityItem({ activity }: { activity: IActivity }) {
  const { marketNfts, isNftsPending } = useCollectionPageContext();

  const nft = marketNfts?.find((nft) => nft.token_id === activity.token_id);
  const actTime = Number(activity?.update_at || 0) * 1000;

  return (
    <div className="flex bg-[#281A31] px-5 py-4 items-center text-sm text-white mb-[15px]">
      <div className="w-[210px] flex items-center">
        {isNftsPending || !nft ? (
          <>
            <Skeleton className="w-[30px] h-[30px] mr-[25px]" />
            <Skeleton className="w-[60px] h-[20px]" />
          </>
        ) : (
          <>
            <Image
              src={nft.token_uri}
              alt=""
              width={30}
              height={30}
              className="mr-[25px]"
            />
            <span>
              {nft?.market_name} {nft?.token_id}
            </span>
          </>
        )}
      </div>
      <div className="w-[160px]">{activity.price} RAE</div>
      <div className="w-[160px]">{truncateAddr(activity.by)}</div>
      <div className="w-[160px]">{capitalize(activity.event)}</div>
      <div className="w-[130px]">
        {replaceTimeUnitToSingleChar(formatDistanceToNowStrict(actTime))}
      </div>
    </div>
  );
}
