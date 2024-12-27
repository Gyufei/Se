import { cn } from "@/lib/utils/common";

export default function Qa({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center text-base text-white", className)}>
      <span>Got questions?</span>
      <span className="tessera-underline ml-1 inline-block">Check our FAQ</span>
    </div>
  );
}
