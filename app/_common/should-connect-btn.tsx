import { SignInDialogOpen } from "@/lib/state/other";
import { AccessTokenAtom } from "@/lib/state/user";
import { cn } from "@/lib/utils/common";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAtomValue, useSetAtom } from "jotai";

export default function ShouldConnectBtn({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();

  const uuid = useAtomValue(AccessTokenAtom);
  const setSignDialogOpen = useSetAtom(SignInDialogOpen);

  function handleClick() {
    if (!isConnected) {
      open();
    } else if (isConnected && !uuid) {
      setSignDialogOpen(true);
    } else {
      onClick();
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
      {isConnected ? children : "Connect Wallet"}
    </button>
  );
}
