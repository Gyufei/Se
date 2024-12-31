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
import { RAE } from "@/lib/const/platform";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { divide, multiply } from "safebase";
import { useCartContext } from "../cart-context";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketActivity } from "@/lib/api/use-market-activity";
import { useCollectionPageContext } from "../page-context";
import { covertErrorMsg } from "@/lib/utils/error";

export default function BuyBag() {
  const queryClient = useQueryClient();
  const { marketName } = useCollectionPageContext();

  const { cartItems, count, total, removeProduct, clearCart } = useCartContext() || {};

  const { isShouldApprove, isApproving, approveAction, approveBtnText } = useApprove(RAE.address, RAE.symbol);

  const {
    data: rae,
    isPending: isRaePending,
    queryKey: raeQueryKey,
  } = useTokenBalance({
    address: RAE.address,
  });
  const { data: raePrice, isPending: isRaePricePending } = useRaePrice();

  const { data: activities, isPending: isActivitiesPending } = useMarketActivity(marketName);

  const { writeContract, isPending: isBuying } = useBatchBuy();

  const isPending = isRaePending || isRaePricePending || isActivitiesPending;

  const totalPriceValue = multiply(total || "0", raePrice?.price || "0");

  const raeDisplay = rae ? divide(String(rae), String(10 ** RAE.decimals)) : 0;

  const orderIds: string[] = useMemo(() => {
    const ids: string[] = [];
    for (const nft of cartItems || []) {
      const activity = activities?.find((activity) => activity.token_id === nft.token_id);

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
            msg: covertErrorMsg(e, "Buy failed"),
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
  }, [isShouldApprove, isApproving, approveBtnText, isBuying, isPending, raeDisplay, count, total]);

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#1D0E27] md:w-[400px]">
      <div className="flex items-center justify-between border-b-2 border-[#ffffff10] px-6 pb-5 pt-12">
        <div className="flex items-center text-[30px] text-white">
          <span>Bag</span>
          <span>{count ? `(${count})` : ""}</span>
        </div>
        {Boolean(count) && (
          <span onClick={handleClear} className="cursor-pointer text-base text-white opacity-60 hover:opacity-100">
            Clear all
          </span>
        )}
      </div>
      <div className="px-3 pt-5">
        {count ? (
          (cartItems || []).map((nft) => <BagItem key={nft.token_id} nft={nft} onRemove={() => removeProduct?.(nft)} />)
        ) : (
          <div className="mt-[68px] flex flex-col items-center justify-center gap-4">
            <Image src="/icons/empty-bag.svg" width={96} height={96} alt="empty" />
            <div className="text-base leading-6 text-white">Your bag is empty</div>
            <div className="text-xs text-[#ffffff80]">Selected NFTs will appear here</div>
          </div>
        )}
      </div>

      {Boolean(count) && (
        <div className="mx-6 mt-5 bg-[#281A31] p-5">
          <div className="text-base text-[#B8B3B6]">Total</div>
          <div className="flex justify-between">
            <div>
              {isPending ? (
                <>
                  <Skeleton className="my-[10px] h-10 w-40" />
                  <Skeleton className="my-2 h-5 w-20" />
                </>
              ) : (
                <>
                  <div className="text-[40px] font-medium text-white">{total}</div>
                  <div className="text-xl text-white opacity-60">${formatNumber(totalPriceValue || "0")}</div>
                </>
              )}
            </div>
            <RaeToken className="self-end" />
          </div>
          <ShouldConnectBtn disabled={btnProps.disabled} className="mt-5 w-full" onClick={handleBuy}>
            {btnProps.text}
          </ShouldConnectBtn>
          <MsgTip className="mt-[15px]" msgPayload={msg} />
        </div>
      )}
    </div>
  );
}
