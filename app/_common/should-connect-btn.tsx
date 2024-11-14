import { cn } from "@/lib/utils/common";

const isConnect = true;
const isConnecting = false;

export default function ShouldConnectBtn({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  function handleClick() {
    if (isConnect) {
      onClick();
    } else {
      //TODO: show connect wallet modal
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "bg-green min-h-12 flex justify-center items-center flex-1 text-[#12021D] text-base font-bold",
        className,
      )}
    >
      {isConnecting ? "Connecting" : isConnect ? children : "Connect Wallet"}
    </button>
  );
}
