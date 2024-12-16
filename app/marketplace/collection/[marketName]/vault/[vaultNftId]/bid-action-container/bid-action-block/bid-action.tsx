import { useMemo, useState } from "react";
import AmountInput from "./amount-input";
import RaeToken from "@/app/_common/rae-token";
import { RAE } from "@/lib/const/platform";
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
import ErrorMessage from "@/app/_common/error-message";

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
  const [bidAmountError, setBidAmountError] = useState("");
  const [bidAddr, setBidAddr] = useState<string | null>(null);
  const [bidAddrType, setBidAddrType] = useState<"pool" | "wallet" | null>(
    null,
  );
  const [bidAddrError, setBidAddrError] = useState("");

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

    return bidAddr;
  }, [canBidAsPool, bidAddr, address]);

  const isPoolAddr = useMemo(() => {
    if (!canBidAsPool) return false;

    return bidAddrType === "pool";
  }, [canBidAsPool, bidAddrType]);

  const selectedAddrBalance = useMemo(() => {
    if (!isPoolAddr || !bidAddr) {
      return raeDisplay;
    }

    const poolInfo = asPoolCreator.pools.find((pool) =>
      checkIsSameAddress(pool.address, bidAddr),
    );

    return subtract(poolInfo?.total_staked, poolInfo?.used_staked);
  }, [isPoolAddr, bidAddr, raeDisplay, asPoolCreator]);

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
    isMarketAndNftPending,
    isAuctionPending,
    isShouldApprove,
    isApproving,
    approveBtnText,
    isBidding,
    isRaePending,
    canBidAsPool,
  ]);

  function checkBidAmount(bidValue: string) {
    if (Number(bidValue) === 0) {
      setBidAmountError("Enter an amount");
      return false;
    }

    if (Number(bidValue) > Number(auctionInfo?.bidding_cap)) {
      setBidAmountError("Bid amount exceeds the bidding cap");
      return false;
    }

    if (Number(selectedAddrBalance) < Number(bidValue)) {
      setBidAmountError("Insufficient balance");
      return false;
    }

    setBidAmountError("");
    return true;
  }

  function checkBidAddr(addr: string | null) {
    if (!addr) {
      setBidAddrError("Select a address");
      return false;
    }

    if (checkIsSameAddress(addr, auctionInfo?.seller)) {
      setBidAddrError("Auction seller cannot bid");
      return false;
    }

    setBidAddrError("");
    return true;
  }

  function handleBid() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    if (!checkBidAmount(bidAmount)) {
      return;
    }

    if (!checkBidAddr(bidAddr)) {
      return;
    }

    if (checkIsSameAddress(bidAddr || address, auctionInfo?.seller)) {
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

  function handleInput(value: string) {
    setBidAmount(value);
    checkBidAmount(value);
  }

  function handleSelectBidAddr(addr: string | null) {
    setBidAddr(addr);
    checkBidAmount(bidAmount);
    checkBidAddr(addr);
  }

  function handleBuyMax() {
    if (Number(raeDisplay) === 0) {
      setBidAmount("0");
      return;
    }

    const leftBid = subtract(auctionInfo?.bidding_cap, auctionInfo?.total_bids);
    if (Number(selectedAddrBalance) > Number(leftBid)) {
      setBidAmount(leftBid);
      return;
    }

    setBidAmount(selectedAddrBalance);
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

      <div className="flex justify-between items-center mt-5 relative">
        <AmountInput amount={bidAmount} setAmount={handleInput} />

        <div className="flex items-center">
          <div
            onClick={handleBuyMax}
            className="cursor-pointer text-white text-sm font-medium tessera-underline"
          >
            Buy max
          </div>
          <RaeToken />
        </div>
        <ErrorMessage
          className="absolute -bottom-[20px]"
          error={bidAmountError}
        />
      </div>

      <div className="flex items-center justify-between mt-5 space-x-5 relative">
        <ShouldConnectBtn
          disabled={btnProps.disabled}
          className="w-full"
          onClick={handleBid}
        >
          {btnProps.text}
        </ShouldConnectBtn>
        {canBidAsPool && (
          <>
            <SelectAddrPop
              addrs={addrOptions}
              selectedAddr={bidAddr}
              setSelectedAddr={handleSelectBidAddr}
              selectedType={bidAddrType}
              setSelectedType={setBidAddrType}
            />
            <ErrorMessage
              className="absolute -top-[30px] right-[68px]"
              error={bidAddrError}
            />
          </>
        )}
      </div>
    </div>
  );
}
