import { cn } from "@/lib/utils/common";

export default function ErrorMessage({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  if (!error) return null;

  return (
    <div className={cn("text-red text-sm mt-[10px]", className)}>{error}</div>
  );
}
