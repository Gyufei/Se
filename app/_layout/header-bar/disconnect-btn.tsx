"use client";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useState } from "react";
import { useDisconnect } from "wagmi";

export function DisconnectBtn({
  setPopOpen,
}: {
  setPopOpen: (isOpen: boolean) => void;
}) {
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
      className="flex justify-between items-center hover:bg-[#281A31] p-[10px] cursor-pointer"
    >
      <div className={cn(isHover ? "text-white" : "text-[#ffffff60]")}>
        Disconnect
      </div>
      <Image
        src={isHover ? "/icons/disconnect.svg" : "/icons/disconnect-gray.svg"}
        alt="disconnect"
        width={16}
        height={16} />
    </div>
  );
}
