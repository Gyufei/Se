"use client";
import { range } from "lodash";
import BagItem from "./bag-item";
import { formatNumber } from "@/lib/utils/number";
import RaeToken from "@/app/_common/rae-token";
import MsgTip, { IMsgPayload } from "@/components/share/msg-tip";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApprove } from "@/lib/web3/use-approve";
import { useBatchBuy } from "@/lib/web3/call/use-batch-buy";
import { RAE } from "@/lib/const/rae";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { divide } from "safebase";

const bagNum = 3;
const total = 11.49;
const totalPriceValue = 30300;

export default function BuyBag() {
  function handleClear() {}

  const queryClient = useQueryClient();

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

  const { write, isPending: isBuying } = useBatchBuy();

  const orderIds: string[] = [];

  const [msg, setMsg] = useState<IMsgPayload>({
    type: null,
    msg: null,
  });

  function handleBuy() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    write(
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

    if (Number(raeDisplay) < totalPriceValue) {
      return {
        text: "Insufficient balance",
        disabled: true,
      };
    }

    if (!orderIds.length) {
      return {
        text: "Select items",
        disabled: true,
      };
    }

    if (isBuying) {
      return {
        text: "Buying...",
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
    orderIds,
    isRaePending,
    raeDisplay,
  ]);

  return (
    <div className="w-[400px] bg-[#1D0E27]">
      <div className="flex justify-between items-center pt-12 px-6 pb-5 border-b-2 border-[#ffffff10]">
        <span className="text-[30px] text-white">
          Bag {bagNum ? `(${bagNum})` : ""}
        </span>
        <span
          onClick={handleClear}
          className="cursor-pointer text-base text-white opacity-60 hover:opacity-100"
        >
          Clear all
        </span>
      </div>
      <div className="pt-5 px-3">
        {range(3).map((i) => (
          <BagItem key={i} />
        ))}
      </div>
      <div className="bg-[#281A31] p-5 mx-6 mt-5">
        <div className="text-base text-[#B8B3B6]">Total</div>
        <div className="flex justify-between">
          <div>
            <div className="text-[40px] text-white font-medium">{total}</div>
            <div className="text-white opacity-60 text-xl">
              ${formatNumber(totalPriceValue)}
            </div>
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
    </div>
  );
}
