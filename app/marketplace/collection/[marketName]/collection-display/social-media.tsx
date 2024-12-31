import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useDeviceSize } from "@/lib/common/use-device-size";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function SocialMedia({ isPending, marketInfo }: { isPending: boolean; marketInfo: any }) {
  const { isMobileSize } = useDeviceSize();
  const [mbPopOpen, setMbPopOpen] = useState(false);

  function handleOpen(link: string | undefined) {
    if (!link) return;
    window.open(link, "_blank");
    setMbPopOpen(false);
  }

  const socialLinks = [
    { icon: "/icons/earth.svg", name: "Website", link: marketInfo?.social_media?.website },
    { icon: "/icons/x.svg", name: "Twitter", link: marketInfo?.social_media?.twitter },
    { icon: "/icons/discord.svg", name: "Discord", link: marketInfo?.social_media?.discord },
    { icon: "/icons/tg.svg", name: "Telegram", link: marketInfo?.social_media?.telegram },
  ];

  if (isMobileSize) {
    if (isPending) {
      return <Skeleton className="absolute right-0 top-1 h-[28px] w-[28px]" />;
    }

    return (
      <Popover open={mbPopOpen} onOpenChange={(isOpen) => setMbPopOpen(isOpen)}>
        <PopoverTrigger className="flex items-center">
          <Image
            className="absolute right-0 top-1 cursor-pointer"
            src="/icons/more.svg"
            width={28}
            height={28}
            alt="social"
          />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="z-[103] flex w-[110px] flex-col items-stretch space-y-[8px] rounded-none border-0 bg-[#382743] p-[5px]"
        >
          {socialLinks.map((link) => (
            <div className="flex items-center px-1" key={link.link} onClick={() => handleOpen(link.link)}>
              <Image src={link.icon} width={16} height={16} alt="social" />
              <span className="ml-2 text-[#ffffff80]">{link.name}</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="mt-[25px] flex items-center space-x-[10px]">
      {isPending ? (
        range(4).map((i) => <Skeleton key={i} className="h-8 w-8" />)
      ) : (
        <>
          {socialLinks.map((link) => (
            <HoverIcon key={link.link} onClick={() => handleOpen(link.link)} src={link.icon} />
          ))}
        </>
      )}
    </div>
  );
}

function HoverIcon({ src, onClick }: { src: string; onClick: () => void }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#281A31]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image src={src} width={20} height={20} alt="earth" className={cn(hover ? "opacity-100" : "opacity-60")} />
    </div>
  );
}
