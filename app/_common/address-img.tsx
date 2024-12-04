import Image from "next/image";
import { blo } from "blo";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/common";

export function AddressImg({
  address,
  width,
  height,
  className,
}: {
  address: string | undefined;
  width: number;
  height: number;
  className?: string;
}) {
  if (!address) {
    return (
      <Skeleton className={cn(`w-[${width}px] h-[${height}px]`, className)} />
    );
  }

  return (
    <Image
      className={className}
      src={blo(address as any)}
      width={width}
      height={height}
      alt="avatar"
    />
  );
}
