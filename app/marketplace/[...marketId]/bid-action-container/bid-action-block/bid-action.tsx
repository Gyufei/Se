import { useMemo, useState } from "react";
import AmountInput from "./amount-input";
import RaeToken from "@/app/_common/rae-token";
import { RAE } from "@/lib/const/rae";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils/number";
import { divide } from "safebase";
import { useApprove } from "@/lib/web3/use-approve";
import { useBidAuction } from "@/lib/web3/call/use-bid-auction";
import { useQueryClient } from "@tanstack/react-query";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import SelectPoolPop from "@/app/_common/select-pool-pop";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useAccount } from "wagmi";

export default function BidAction() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { isShouldApprove, isApproving, approveAction, approveBtnText } =
    useApprove(RAE.address, RAE.symbol);

  const {
    data: rae,
    isPending: isRaePending,
    queryKey: raeQueryKey,
  } = useTokenBalance({
    address: RAE.address,
  });
  const raeDisplay = rae ? divide(String(rae), String(10 ** RAE.decimals)) : 0;

  const { write, isPending: isBidding } = useBidAuction();

  const canBidAsPool = true;
  const auctionId = 0;
  const [bidAmount, setBidAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  function handleBid() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    write(
      {
        bidder: selectedPool || address!,
        auctionId: auctionId,
        amount: Number(bidAmount),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [raeQueryKey] });
          setGlobalMsg({
            type: "success",
            message: "Bid successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: e.message || "Bid failed",
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (isRaePending) {
      return {
        text: "Pay",
        disabled: true,
      };
    }

    if (isShouldApprove) {
      return {
        text: approveBtnText,
        disabled: isApproving,
      };
    }

    if (Number(raeDisplay) < Number(bidAmount)) {
      return {
        text: "Insufficient balance",
        disabled: true,
      };
    }

    if (isBidding) {
      return {
        text: "Bidding...",
        disabled: true,
      };
    }

    if (canBidAsPool) {
      return {
        text: "Bid as",
        disabled: false,
      };
    }

    return {
      text: "Bid",
      disabled: false,
    };
  }, [
    isShouldApprove,
    isApproving,
    approveBtnText,
    raeDisplay,
    bidAmount,
    isBidding,
    isRaePending,
    canBidAsPool,
  ]);

  const handleInput = (value: string) => {
    setBidAmount(value);
  };

  function handleBuyMax() {
    setBidAmount(raeDisplay);
  }

  return (
    <div className="pt-6 pb-5 px-5">
      <div className="flex justify-between">
        <span className="text-base font-medium text-white">Bid Amount</span>
        <span>
          <span className="text-white opacity-60 text-xs font-medium">
            Balance:
          </span>
          {isRaePending ? (
            <Skeleton className="w-12 h-4" />
          ) : (
            <span className="text-white text-xs font-medium inline-block ml-1">
              {formatNumber(raeDisplay)} RAE
            </span>
          )}
        </span>
      </div>

      <div className="flex justify-between items-center mt-5">
        <AmountInput amount={bidAmount} setAmount={handleInput} />

        <div className="flex items-center">
          <div
            onClick={handleBuyMax}
            className="cursor-pointer text-white text-sm font-medium underline decoration-green underline-offset-4"
          >
            Buy max
          </div>
          <RaeToken />
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 space-x-5">
        <ShouldConnectBtn
          disabled={btnProps.disabled}
          className="w-full"
          onClick={handleBid}
        >
          {btnProps.text}
        </ShouldConnectBtn>
        {canBidAsPool && (
          <SelectPoolPop
            selectedPool={selectedPool}
            setSelectedPool={setSelectedPool}
          />
        )}
      </div>
    </div>
  );
}
