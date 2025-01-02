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
import { useDeviceSize } from "@/lib/common/use-device-size";
import { cn } from "@/lib/utils/common";

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

  const { isMobileSize } = useDeviceSize();
  const [mbShowToggle, setMbShowToggle] = useState(false);
  const mbShow = !isMobileSize || (isMobileSize && mbShowToggle);

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
    <div className="fixed bottom-0 left-0 right-0 w-auto bg-[#1D0E27] md:static md:min-h-[calc(100vh-64px)] md:w-[400px]">
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 md:px-6 md:pb-5 md:pt-12",
          `${mbShow && "border-b-2 border-[#ffffff10]"}`,
        )}
      >
        <div className="flex items-center text-xl text-white md:text-[30px]">
          <span>Bag</span>
          <span className="text-green md:text-white">{count ? ` (${count})` : ""}</span>
        </div>
        <div className="flex items-center">
          {Boolean(count) && (
            <>
              <Image className="block md:hidden" src="/icons/clear.svg" width={20} height={20} alt="clear" />
              <span
                onClick={handleClear}
                className="ml-1 mr-6 cursor-pointer text-sm text-white opacity-60 hover:opacity-100 md:ml-0 md:mr-0 md:text-base"
              >
                Clear all
              </span>
            </>
          )}
          <div
            className={cn(
              "flex items-center justify-center bg-[#3D3146] opacity-60 md:hidden",
              `${mbShowToggle && "rotate-180"}`,
            )}
            onClick={() => setMbShowToggle(!mbShowToggle)}
          >
            <Image src="/icons/bracket-up.svg" width={20} height={20} alt="up" />
          </div>
        </div>
      </div>

      {((isMobileSize && mbShow) || !isMobileSize) && (
        <div className="flex h-[386px] flex-col justify-between md:h-fit md:justify-start">
          <div className="overflow-y-auto p-4 md:overflow-y-hidden md:px-3 md:pt-5">
            {count ? (
              (cartItems || []).map((nft) => (
                <BagItem key={nft.token_id} nft={nft} onRemove={() => removeProduct?.(nft)} />
              ))
            ) : (
              <div className="mt-[68px] flex flex-col items-center justify-center gap-4">
                <Image src="/icons/empty-bag.svg" width={96} height={96} alt="empty" />
                <div className="text-base leading-6 text-white">Your bag is empty</div>
                <div className="text-xs text-[#ffffff80]">Selected NFTs will appear here</div>
              </div>
            )}
          </div>

          {Boolean(count) && (
            <div className="mx-0 my-0 flex flex-row items-center justify-between bg-[#281A31] px-4 py-2 md:mx-6 md:my-2 md:mt-5 md:flex-col md:items-stretch md:justify-start md:px-5 md:py-5">
              <div className="hidden text-base text-[#B8B3B6] md:block">Total</div>
              <div className="flex justify-between">
                <div>
                  {isPending ? (
                    <>
                      <Skeleton className="my-[10px] h-5 w-24 md:h-10 md:w-40" />
                      <Skeleton className="my-2 h-5 w-20 md:h-5 md:w-20" />
                    </>
                  ) : (
                    <>
                      <div className="text-[18px] font-medium text-white md:text-[40px]">
                        {total}&nbsp;
                        <span className="inline-block md:hidden">RAE</span>
                      </div>
                      <div className="text-xs text-white opacity-60 md:text-xl">
                        ${formatNumber(totalPriceValue || "0")}
                      </div>
                    </>
                  )}
                </div>
                <RaeToken className="hidden self-end md:flex" />
              </div>
              <ShouldConnectBtn
                disabled={btnProps.disabled}
                className="mt-0 h-9 min-h-9 flex-grow-0 basis-auto px-2 text-xs md:mt-5 md:min-h-12 md:flex-1 md:px-0"
                onClick={handleBuy}
              >
                {btnProps.text}
              </ShouldConnectBtn>
              <MsgTip className="mt-[15px]" msgPayload={msg} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
