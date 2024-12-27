"use client";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useState } from "react";

export function HoverIcon({ src, onClick, className }: { src: string; onClick: () => void; className?: string; }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center bg-[#12021d] hover:bg-[#2A1C34]",
        className
      )}
    >
      <Image src={src} width={24} height={24} alt="Twitter" className={cn(hover ? "opacity-100" : "opacity-60")} />
    </div>
  );
}
