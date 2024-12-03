import { useMemo, useState } from "react";
import AmountInput from "./amount-input";
import RaeToken from "@/app/_common/rae-token";
import { RAE } from "@/lib/const/rae";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils/number";
import { divide, multiply } from "safebase";
import { useApprove } from "@/lib/web3/use-approve";
import { useBidAuction } from "@/lib/web3/call/use-bid-auction";
import { useQueryClient } from "@tanstack/react-query";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import SelectPoolPop from "@/app/_common/select-pool-pop";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useAccount } from "wagmi";
import { useLuckyNFTPageContext } from "../../page-context";
import { useCheckIsPoolCreator } from "@/lib/api/use-pools";
import { checkIsSameAddress } from "@/lib/utils/web3";

export default function BidAction() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { address } = useAccount();

  const { isMarketAndNftPending, isAuctionPending, auctionInfo } =
    useLuckyNFTPageContext();
  const { data: asPoolCreator } = useCheckIsPoolCreator(address);

  const canBidAsPool = asPoolCreator?.isAPoolCreator;
  const pools = useMemo(() => {
    if (!canBidAsPool) return [];

    const pools = asPoolCreator.pools.map((pool) => ({
      address: pool.address,
      type: "pool",
    }));

    pools.unshift({
      address: address!,
      type: "wallet",
    });

    return pools;
  }, [canBidAsPool, asPoolCreator, address]);

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

  const { writeContract, isPending: isBidding } = useBidAuction();

  const [bidAmount, setBidAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  function handleBid() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    if (checkIsSameAddress(selectedPool || address, auctionInfo?.seller)) {
      setGlobalMsg({
        type: "error",
        message: "Auction seller cannot bid",
      });
      return;
    }

    const amount = multiply(bidAmount, String(10 ** RAE.decimals));

    writeContract(
      {
        bidder: selectedPool || address!,
        auctionId: Number(auctionInfo!.id),
        amount: Number(amount),
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
    if (isMarketAndNftPending || isAuctionPending || isRaePending) {
      return {
        text: "Bid",
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
        disabled: !selectedPool,
      };
    }

    return {
      text: "Bid",
      disabled: false,
    };
  }, [
    isMarketAndNftPending,
    isAuctionPending,
    isShouldApprove,
    isApproving,
    approveBtnText,
    raeDisplay,
    bidAmount,
    isBidding,
    isRaePending,
    selectedPool,
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
            pools={pools}
            selectedPool={selectedPool}
            setSelectedPool={setSelectedPool}
          />
        )}
      </div>
    </div>
  );
}
