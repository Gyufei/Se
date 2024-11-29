import { cn } from "@/lib/utils/common";

export default function Empty({
  text = "No data",
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[#ffffff60] flex justify-center text-sm font-medium",
        className,
      )}
    >
      {text}
    </div>
  );
}
