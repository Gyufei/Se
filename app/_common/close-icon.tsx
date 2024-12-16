"use client";

import { cn } from "@/lib/utils/common";
import Image from "next/image";

export default function CloseIcon({
  onClick,
  className,
  width = 24,
  height = 24,
}: {
  onClick?: () => void;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/icons/close-fill.svg"
      width={width}
      height={height}
      alt="close"
      className={cn("cursor-pointer", className)}
      onClick={onClick ?? (() => {})}
    />
  );
}
