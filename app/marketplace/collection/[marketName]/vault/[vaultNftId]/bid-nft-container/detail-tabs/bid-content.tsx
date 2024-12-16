import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BidList from "./bid-list";

export default function BidContent() {
  const [onlyMe, setOnlyMe] = useState(false);

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <OnlyMeSwitch onlyMe={onlyMe} setOnlyMe={setOnlyMe} />
        <BuyRaeBtn />
      </div>
      <BidList onlyMe={onlyMe} />
    </div>
  );
}

function OnlyMeSwitch({
  onlyMe,
  setOnlyMe,
}: {
  onlyMe: boolean;
  setOnlyMe: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-4">
      <Switch
        checked={onlyMe}
        onCheckedChange={(v) => setOnlyMe(v)}
        id="onlyMe"
      />
      <label className="text-white opacity-60 text-xs" htmlFor="onlyMe">
        Only Show Mine
      </label>
    </div>
  );
}

function BuyRaeBtn() {
  return (
    <Link href="/buy-rae">
      <button className="px-5 h-10 flex items-center bg-green space-x-1">
        <Image
          src="/icons/lighting.svg"
          width={16}
          height={16}
          alt="lighting"
        />
        <span className="text-sm font-bold text-[#12021d]">Buy Raes</span>
      </button>
    </Link>
  );
}
