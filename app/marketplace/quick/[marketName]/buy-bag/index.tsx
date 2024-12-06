"use client";
import Image from "next/image";
import BagItem from "./bag-item";
import { formatNumber } from "@/lib/utils/number";
import RaeToken from "@/app/_common/rae-token";
import MsgTip, { IMsgPayload } from "@/app/_common/msg-tip";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApprove } from "@/lib/web3/use-approve";
import { useBatchBuy } from "@/lib/web3/call/use-batch-buy";
import { RAE } from "@/lib/const/rae";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { divide, multiply } from "safebase";
import { useCartContext } from "../cart-context";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketActivity } from "@/lib/api/use-market-activity";
import { useQuickPageContext } from "../page-context";

export default function BuyBag() {
  const queryClient = useQueryClient();
  const { marketName } = useQuickPageContext();

  const { cartItems, count, total, removeProduct, clearCart } =
    useCartContext() || {};

  const { isShouldApprove, isApproving, approveAction, approveBtnText } =
    useApprove(RAE.address, RAE.symbol);

  const {
    data: rae,
    isPending: isRaePending,
    queryKey: raeQueryKey,
  } = useTokenBalance({
    address: RAE.address,
  });
  const { data: raePrice, isPending: isRaePricePending } = useRaePrice();

  const { data: activities, isPending: isActivitiesPending } =
    useMarketActivity(marketName);

  const { writeContract, isPending: isBuying } = useBatchBuy();

  const isPending = isRaePending || isRaePricePending || isActivitiesPending;

  const totalPriceValue = multiply(total || "0", raePrice?.price || "0");

  const raeDisplay = rae ? divide(String(rae), String(10 ** RAE.decimals)) : 0;

  const orderIds: string[] = useMemo(() => {
    const ids: string[] = [];
    for (const nft of cartItems || []) {
      const activity = activities?.find(
        (activity) => activity.token_id === nft.token_id,
      );

      if (activity && activity.order_id && activity.event === "LISTED") {
        ids.push(activity.order_id);
      }
    }

    return ids;
  }, [cartItems, activities]);

  const [msg, setMsg] = useState<IMsgPayload>({
    type: null,
    msg: null,
  });

  function handleClear() {
    clearCart?.();
  }

  function handleBuy() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    writeContract(
      {
        orderIds,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [raeQueryKey] });
          setMsg({
            type: "success",
            msg: "Buy successfully",
          });
          handleClear();
        },
        onError: (e: any) => {
          setMsg({
            type: "error",
            msg: e.message || "Buy failed",
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (!count) {
      return {
        text: "Select NFT",
        disabled: true,
      };
    }

    if (isPending) {
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

    if (Number(raeDisplay) < Number(total)) {
      return {
        text: "Insufficient balance",
        disabled: true,
      };
    }

    if (isBuying) {
      return {
        text: "Paying...",
        disabled: true,
      };
    }

    return {
      text: "Pay",
      disabled: false,
    };
  }, [
    isShouldApprove,
    isApproving,
    approveBtnText,
    isBuying,
    isPending,
    raeDisplay,
    count,
    total,
  ]);

  return (
    <div className="w-[400px] bg-[#1D0E27] min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center pt-12 px-6 pb-5 border-b-2 border-[#ffffff10]">
        <div className="flex items-center text-[30px] text-white">
          <span>Bag</span>
          <span>{count ? `(${count})` : ""}</span>
        </div>
        {Boolean(count) && (
          <span
            onClick={handleClear}
            className="cursor-pointer text-base text-white opacity-60 hover:opacity-100"
          >
            Clear all
          </span>
        )}
      </div>
      <div className="pt-5 px-3">
        {count ? (
          (cartItems || []).map((nft) => (
            <BagItem
              key={nft.token_id}
              nft={nft}
              onRemove={() => removeProduct?.(nft)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center mt-[68px] flex-col gap-4">
            <Image
              src="/icons/empty-bag.svg"
              width={96}
              height={96}
              alt="empty"
            />
            <div className="text-white text-base leading-6">
              Your bag is empty
            </div>
            <div className="text-xs text-[#ffffff80]">
              Selected NFTs will appear here
            </div>
          </div>
        )}
      </div>

      {Boolean(count) && (
        <div className="bg-[#281A31] p-5 mx-6 mt-5">
          <div className="text-base text-[#B8B3B6]">Total</div>
          <div className="flex justify-between">
            <div>
              {isPending ? (
                <>
                  <Skeleton className="w-40 h-10 my-[10px]" />
                  <Skeleton className="w-20 h-5 my-2" />
                </>
              ) : (
                <>
                  <div className="text-[40px] text-white font-medium">
                    {total}
                  </div>
                  <div className="text-white opacity-60 text-xl">
                    ${formatNumber(totalPriceValue || "0")}
                  </div>
                </>
              )}
            </div>
            <RaeToken className="self-end" />
          </div>
          <ShouldConnectBtn
            disabled={btnProps.disabled}
            className="mt-5 w-full"
            onClick={handleBuy}
          >
            {btnProps.text}
          </ShouldConnectBtn>
          <MsgTip className="mt-[15px]" msgPayload={msg} />
        </div>
      )}
    </div>
  );
}
