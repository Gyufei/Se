import { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { capitalize } from "lodash";
import { cn } from "@/lib/utils/common";

export type ISortType = "price" | "rarity";
export type ISortDirection = "asc" | "desc";

const sortTextObj: Record<ISortType, Record<ISortDirection, string>> = {
  price: {
    asc: "Low to High",
    desc: "High to Low",
  },
  rarity: {
    asc: "Rare to Common",
    desc: "Common to Rare",
  },
};

const sortNames = Object.keys(sortTextObj) as Array<ISortType>;
const sortDirs: Array<ISortDirection> = ["asc", "desc"];

export default function SortSelect({
  name,
  setName,
  dir,
  setDir,
}: {
  name: ISortType;
  setName: (name: ISortType) => void;
  dir: ISortDirection;
  setDir: (dir: ISortDirection) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={(o) => setOpen(o)}>
      <PopoverTrigger asChild>
        <div className="flex h-12 flex-1 cursor-pointer items-center space-x-[5px] bg-[#281A31] px-5">
          <span>⬆️</span>
          <span>{capitalize(name)}:</span>
          <span>{sortTextObj[name][dir]}</span>
          <Image src="/icons/bracket-up.svg" width={16} height={16} alt="arrow" className={cn(!open && "rotate-180")} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[220px] flex-col items-stretch space-y-[5px] rounded-none border-0 bg-[#382743] p-[5px]"
      >
        {sortNames.map((name) => {
          // TODO: add rarity sort
          if (name === "rarity") return null;
          return sortDirs.map((direction) => (
            <div
              key={name}
              className="flex h-10 cursor-pointer items-center rounded-none px-4 text-sm text-white hover:bg-[#281A31]"
              onClick={() => {
                setName(name);
                setDir(direction);
                setOpen(false);
              }}
            >
              {capitalize(name)}: {sortTextObj[name][direction]}
            </div>
          ));
        })}
      </PopoverContent>
    </Popover>
  );
}
