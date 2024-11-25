import { SignInDialogOpen } from "@/lib/state/other";
import { AccessTokenAtom } from "@/lib/state/user";
import { cn } from "@/lib/utils/common";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAtomValue, useSetAtom } from "jotai";
import { useAccount } from "wagmi";

export default function ShouldConnectBtn({
  disabled,
  className,
  children,
  onClick,
}: {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  const uuid = useAtomValue(AccessTokenAtom);
  const setSignDialogOpen = useSetAtom(SignInDialogOpen);

  const btnDisabled = !isConnected ? false : disabled;

  function handleClick() {
    if (!isConnected && openConnectModal) {
      openConnectModal();
      return;
    }

    if (disabled) return;

    if (isConnected && !uuid) {
      setSignDialogOpen(true);
    } else {
      onClick();
    }
  }

  return (
    <button
      disabled={btnDisabled}
      onClick={handleClick}
      className={cn(
        "bg-green min-h-12 flex justify-center cursor-pointer items-center flex-1 text-[#12021D] text-base font-bold hover:bg-[#9BD545] disabled:bg-[#CCF492] disabled:text-[#12021D60] disabled:cursor-default",
        className,
      )}
    >
      {isConnected ? children : "Connect Wallet"}
    </button>
  );
}
