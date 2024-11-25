import { cn } from "@/lib/utils/common";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-[#ffffff1a]", className)}
      {...props}
    />
  );
}

export { Skeleton };
