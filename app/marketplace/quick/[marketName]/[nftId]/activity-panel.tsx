import CollapsePanel from "@/app/_common/collapse-panel";
import { INFT } from "@/lib/api/use-market-nfts";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { truncateAddr } from "@/lib/utils/web3";
import { formatDistanceToNowStrict } from "date-fns";
import { useQuickPageContext } from "../page-context";
import { useMarketActivity } from "@/lib/api/use-market-activity";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize, range } from "lodash";
import Empty from "@/app/_common/empty";
import { useMemo } from "react";

export default function ActivityPanel({ nft }: { nft: INFT | undefined }) {
  const { marketName } = useQuickPageContext();
  const { data: activities, isPending: isActivitiesPending } =
    useMarketActivity(marketName, nft?.token_id);

  const isPending = isActivitiesPending || !nft;

  const displayActivities = useMemo(() => {
    if (!activities || !nft) return [];
    return activities?.filter((act) => act.token_id === nft?.token_id);
  }, [activities, nft]);

  return (
    <CollapsePanel className="mt-[30px]" panelName="Activity">
      <div className="flex items-center text-sm text-white opacity-60 px-5 mt-6">
        <div className="w-[150px]">Event</div>
        <div className="w-[135px]">Price</div>
        <div className="w-[240px]">By</div>
        <div className="w-[42px]">Time</div>
      </div>
      <div className="mt-[10px] mb-5">
        {isPending ? (
          range(0, 3).map((i) => <Skeleton key={i} className="h-5 my-5 mx-5" />)
        ) : displayActivities?.length ? (
          displayActivities.map((act, i) => (
            <div
              key={i + act.event}
              className="flex items-center text-white text-sm px-5 h-10"
            >
              <div className="w-[150px]">{capitalize(act.event)}</div>
              <div className="w-[135px]">{act.price} RAE</div>
              <div className="w-[240px]">{truncateAddr(act.by)}</div>
              <div className="w-[42px]">
                {replaceTimeUnitToSingleChar(
                  formatDistanceToNowStrict(Number(act.update_at) * 1000),
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty className="mt-5" text="No activity" />
        )}
      </div>
    </CollapsePanel>
  );
}
