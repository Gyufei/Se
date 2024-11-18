import CollapsePanel from "@/app/_common/collapse-panel";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { truncateAddr } from "@/lib/utils/web3";
import { formatDistanceToNowStrict } from "date-fns";

const activities = [
  {
    id: 1,
    event: "Event 1",
    price: 100,
    by: "0x1234567890abcdef1234567890abcdef12345678",
    time: new Date().getTime() - 1000 * 60 * 60 * 3,
  },
  {
    id: 2,
    price: 200,
    event: "Event 2",
    by: "0x1234567890abcdef1234567890abcdef12345678",
    time: new Date().getTime() - 1000 * 60 * 60 * 4,
  },
];

export default function ActivityPanel() {
  return (
    <CollapsePanel className="mt-[30px]" panelName="Activity">
      <div className="flex items-center text-sm text-white opacity-60 px-5 mt-6">
        <div className="w-[150px]">Event</div>
        <div className="w-[135px]">Price</div>
        <div className="w-[240px]">By</div>
        <div className="w-[42px]">Time</div>
      </div>
      <div className="mt-[10px] mb-5">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center text-white text-sm px-5 h-10"
          >
            <div className="w-[150px]">{act.event}</div>
            <div className="w-[135px]">{act.price} RAE</div>
            <div className="w-[240px]">{truncateAddr(act.by)}</div>
            <div className="w-[42px]">
              {replaceTimeUnitToSingleChar(formatDistanceToNowStrict(act.time))}
            </div>
          </div>
        ))}
      </div>
    </CollapsePanel>
  );
}
