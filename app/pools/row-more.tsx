import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDeviceSize } from "@/lib/common/use-device-size";

export default function RowMore({ pool }: { pool: any }) {
  const router = useRouter();
  const { isMobileSize } = useDeviceSize();

  const [mbPopOpen, setMbPopOpen] = useState(false);

  function handlePoolClick(poolAddress: string) {
    router.push(`/pools/${poolAddress}`);
  }

  if (!isMobileSize)
    return (
      <div
        onClick={() => handlePoolClick(pool.address)}
        className="tessera-underline hidden flex-1 cursor-pointer items-center text-center md:block"
      >
        Delegate
      </div>
    );

  return (
    <Popover open={mbPopOpen} onOpenChange={(isOpen) => setMbPopOpen(isOpen)}>
      <PopoverTrigger className="absolute right-4 top-4 flex items-center md:hidden">
        <Image className="cursor-pointer" src="/icons/more.svg" width={28} height={28} alt="social" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="z-[103] flex w-[110px] flex-col items-stretch space-y-[8px] rounded-none border-0 bg-[#382743] p-[5px]"
      >
        <div className="flex items-center px-1" onClick={() => handlePoolClick(pool.address)}>
          <span className="ml-2 text-[#ffffff80]">Delegate</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
