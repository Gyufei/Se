import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { DisconnectBtn } from "./disconnect-btn";
import { RAE } from "@/lib/const/platform";
import { divide } from "safebase";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConnectBtnPopContent({ setPopOpen }: { setPopOpen: (isOpen: boolean) => void }) {
  const { data: rae, isPending: isRaePending } = useTokenBalance({
    address: RAE.address,
  });

  const raeDisplay = rae ? divide(String(rae), String(10 ** RAE.decimals)) : 0;

  return (
    <>
      <div className="flex items-center justify-between gap-2 border border-dashed border-[#ffffff40] p-[10px]">
        <span>RAE</span>
        {isRaePending ? <Skeleton className="h-4 w-10" /> : <span className="text-green">{raeDisplay}</span>}
      </div>
      <DisconnectBtn setPopOpen={setPopOpen} />
    </>
  );
}
