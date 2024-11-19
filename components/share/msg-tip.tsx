import Image from "next/image";
import { cn } from "@/lib/utils/common";

const iconMap = {
  error: "/icons/error.svg",
  warning: "/icons/info.svg",
  success: "/icons/success.svg",
};

export type IMsgType = "error" | "warning" | "success";

export interface IMsgPayload {
  type: IMsgType | null;
  msg: string | null;
}

export default function MsgTip({
  msgPayload,
  className,
}: {
  msgPayload: IMsgPayload;
  className?: string;
}) {
  const { type, msg } = msgPayload;

  if (!type || !msg) return null;

  return (
    <div
      className={cn(
        "h-8 relative flex items-center px-5",
        type === "error" && "bg-[#EF466F40]",
        type === "warning" && "bg-[#3772FF40]",
        type === "success" && "bg-[#AAED4A40]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-0 w-1 h-full",
          type === "error" && "bg-[#EF466F]",
          type === "warning" && "bg-[#3772FF]",
          type === "success" && "bg-[#AAED4A]",
        )}
      ></div>
      <div className="flex items-center space-x-[5px]">
        <Image src={iconMap[type]} width={16} height={16} alt="icon" />
        <span className="text-white text-xs">{msg}</span>
      </div>
    </div>
  );
}
