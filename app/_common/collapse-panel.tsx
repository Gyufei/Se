import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useState } from "react";

export default function CollapsePanel({
  panelName,
  children,
  className,
}: {
  panelName: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={cn("bg-[#281A31]", className)}>
      <div className="flex justify-between items-center px-5 py-3 border-b-2 border-b-[#ffffff10]">
        <div className="text-[18px] text-white font-medium">{panelName}</div>
        <Image
          className="cursor-pointer"
          onClick={toggleCollapse}
          src={isCollapsed ? "/icons/plus.svg" : "/icons/minus.svg"}
          width={28}
          height={28}
          alt="collapse"
        />
      </div>
      <div
        className={cn(
          "transition-all duration-500 ease-in-out overflow-hidden",
          isCollapsed ? "h-0" : "h-auto",
        )}
      >
        {children}
      </div>
    </div>
  );
}
