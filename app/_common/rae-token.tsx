import { cn } from "@/lib/utils/common";
import Image from "next/image";

export default function RaeToken({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center ml-6 px-5 bg-[#382743] h-12", className)}
    >
      <Image
        src="/icons/rae.svg"
        className="rounded-full"
        width={16}
        height={16}
        alt="rae"
      />
      <span className="text-white text-sm inline-block ml-2">RAE</span>
    </div>
  );
}
