import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/common";
import { capitalize } from "lodash";
import { IActivity } from "@/lib/api/use-market-activity";

export type IEventType = IActivity["event"];

export const EventArr = [
  "LIST",
  "DELIST",
  "PURCHASE",
  "VAULT",
  "BID",
  "ABORT",
  "TRANSFER",
] as const;

const SelectItemRowClx =
  "flex justify-between h-10 cursor-pointer items-center rounded-none pl-4 pr-2 text-sm text-white hover:bg-[#281A31]";

export default function EventSelect({
  events,
  setEvents,
}: {
  events: Array<IEventType>;
  setEvents: (_t: any) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleSelectAll() {
    if (events.length) {
      setEvents([]);
    }
    setPopOpen(false);
  }

  function handleSelectEvent(t: IEventType) {
    setEvents((prev: Array<IEventType>) => {
      if (prev.includes(t)) {
        return [...prev.filter((e: IEventType) => e !== t)];
      } else {
        return [...prev, t];
      }
    });
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger className="h-10 flex w-[112px] cursor-pointer items-center justify-start rounded-none">
        <div className="min-w-[30px] pr-[4px] text-sm leading-5 text-white">
          Event
        </div>
        <Image
          src="/icons/bracket-up.svg"
          width={16}
          height={16}
          alt="arrow"
          className={cn(!popOpen && "rotate-180")}
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[134px] h-[200px] overflow-y-scroll trans-scroll-bar flex-col items-stretch rounded-none border-0 bg-[#382743] space-y-[5px] p-[5px]"
      >
        <div className="h-fit">
          <div onClick={() => handleSelectAll()} className={SelectItemRowClx}>
            <span className={!events.length ? "text-green" : ""}>All</span>
          </div>
          {EventArr.map((t) => (
            <div
              key={t}
              onClick={() => handleSelectEvent(t)}
              className={SelectItemRowClx}
            >
              <span
                className={events.includes(t) ? "text-green" : "text-white"}
              >
                {capitalize(t)}
              </span>
              {events.includes(t) && (
                <Image
                  src="/icons/green-check.svg"
                  width={16}
                  height={16}
                  alt="check"
                />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
