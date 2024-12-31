"use client";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useState } from "react";
import { useDisconnect } from "wagmi";

export function DisconnectBtn({ setPopOpen }: { setPopOpen: (isOpen: boolean) => void }) {
  const [isHover, setIsHover] = useState(false);
  const { disconnect } = useDisconnect();

  function handleDisconnect() {
    disconnect();
    setPopOpen(false);
  }

  return (
    <div
      onClick={handleDisconnect}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="mt-[5px] flex cursor-pointer items-center justify-between p-[10px] hover:bg-[#281A31]"
    >
      <div className={cn(isHover ? "text-white" : "text-[#ffffff60]")}>Disconnect</div>
      <Image
        src={isHover ? "/icons/disconnect.svg" : "/icons/disconnect-gray.svg"}
        alt="disconnect"
        width={16}
        height={16}
      />
    </div>
  );
}
