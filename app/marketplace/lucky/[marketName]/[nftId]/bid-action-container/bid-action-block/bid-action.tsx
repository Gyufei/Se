import { useMemo, useState } from "react";
import AmountInput from "./amount-input";
import RaeToken from "@/app/_common/rae-token";
import { RAE } from "@/lib/const/rae";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils/number";
import { divide, multiply, subtract } from "safebase";
import { useApprove } from "@/lib/web3/use-approve";
import { useBidAuction } from "@/lib/web3/call/use-bid-auction";
import { useQueryClient } from "@tanstack/react-query";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import SelectAddrPop, { AddrOptions } from "@/app/_common/select-addr-pop";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useAccount } from "wagmi";
import { useLuckyNFTPageContext } from "../../page-context";
import { useCheckIsPoolCreator } from "@/lib/api/use-pools";
import { checkIsSameAddress } from "@/lib/utils/web3";
import { covertErrorMsg } from "@/lib/utils/error";

export default function BidAction() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { address } = useAccount();

  const { isMarketAndNftPending, isAuctionPending, auctionInfo } =
    useLuckyNFTPageContext();
  const { data: asPoolCreator } = useCheckIsPoolCreator(address);
  const canBidAsPool = asPoolCreator?.isAPoolCreator;

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
  const [selectedAddr, setSelectedAddr] = useState<string | null>(null);
  const [selectedAddrType, setSelectedAddrType] = useState<
    "pool" | "wallet" | null
  >(null);

  const addrOptions = useMemo(() => {
    if (!canBidAsPool) return [];

    const addrs = asPoolCreator.pools.map((pool) => ({
      address: pool.address,
      type: "pool",
    }));

    addrs.unshift({
      address: address!,
      type: "wallet",
    });

    return addrs as Array<AddrOptions>;
  }, [canBidAsPool, asPoolCreator, address]);

  const bidder = useMemo(() => {
    if (!canBidAsPool) return address;

    return selectedAddr;
  }, [canBidAsPool, selectedAddr, address]);

  const isPoolAddr = useMemo(() => {
    if (!canBidAsPool) return false;

    return selectedAddrType === "pool";
  }, [canBidAsPool, selectedAddrType]);

  const selectedAddrBalance = useMemo(() => {
    if (!isPoolAddr || !selectedAddr) {
      return raeDisplay;
    }

    const poolInfo = asPoolCreator.pools.find((pool) =>
      checkIsSameAddress(pool.address, selectedAddr),
    );

    return subtract(poolInfo?.total_staked, poolInfo?.used_staked);
  }, [isPoolAddr, selectedAddr, raeDisplay, asPoolCreator]);

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

    if (Number(bidAmount) === 0) {
      return {
        text: "Enter an amount",
        disabled: true,
      };
    }

    if (!bidder) {
      return {
        text: "Select a address",
        disabled: true,
      };
    }

    if (Number(selectedAddrBalance) < Number(bidAmount)) {
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
        disabled: !selectedAddr,
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
    bidAmount,
    selectedAddrBalance,
    isBidding,
    bidder,
    isRaePending,
    selectedAddr,
    canBidAsPool,
  ]);

  function handleBid() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    if (checkIsSameAddress(selectedAddr || address, auctionInfo?.seller)) {
      setGlobalMsg({
        type: "error",
        message: "Auction seller cannot bid",
      });
      return;
    }

    const amount = multiply(bidAmount, String(10 ** RAE.decimals));

    writeContract(
      {
        bidder: bidder!,
        auctionId: Number(auctionInfo!.id),
        amount: Number(amount),
        asPool: isPoolAddr,
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
            message: covertErrorMsg(e, "Bid failed"),
          });
        },
      },
    );
  }

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
            {isPoolAddr && "Pool"} Balance:
          </span>
          {isRaePending ? (
            <Skeleton className="w-12 h-4" />
          ) : (
            <span className="text-white text-xs font-medium inline-block ml-1">
              {formatNumber(selectedAddrBalance)} RAE
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
          <SelectAddrPop
            addrs={addrOptions}
            selectedAddr={selectedAddr}
            setSelectedAddr={setSelectedAddr}
            selectedType={selectedAddrType}
            setSelectedType={setSelectedAddrType}
          />
        )}
      </div>
    </div>
  );
}
