"use client";
import { useMemo } from "react";
import { useApprove } from "@/lib/web3/use-approve";
import { RAE } from "@/lib/const/rae";
import { cn } from "@/lib/utils/common";
import { erc20Abi } from "viem";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import { useWriteContract } from "wagmi";

export default function BuyBag() {
  const { chainConfig } = useChainConfig();
  const { isShouldApprove, isApproving, approveAction, approveBtnText } =
    useApprove(RAE.address, RAE.symbol);

  const mutation = useWriteContract();

  const btnProps = useMemo(() => {
    if (isShouldApprove) {
      return {
        text: approveBtnText,
        disabled: isApproving,
      };
    }

    if (mutation.isPending) {
      return {
        text: "Revoking...",
        disabled: true,
      };
    }

    return {
      text: "Revoke",
      disabled: false,
    };
  }, [isShouldApprove, isApproving, approveBtnText, mutation.isPending]);

  function handleClick() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    const spender = chainConfig.contracts.TesseraRouter;

    const callParams = {
      abi: erc20Abi,
      address: RAE.address as any,
      functionName: "approve",
      args: [spender, BigInt(0)],
    };

    mutation.writeContract(
      {
        ...(callParams as any),
      },
      {
        onSuccess: () => {},
        onError: (error) => {
          console.error("approveAction error: =>", error);
        },
      },
    );
  }

  return (
    <button
      disabled={btnProps.disabled}
      onClick={handleClick}
      className={cn(
        "bg-green min-h-12 flex justify-center cursor-pointer items-center flex-1 text-[#12021D] text-base font-bold hover:bg-[#9BD545] disabled:bg-[#CCF492] disabled:text-[#12021D60] disabled:cursor-default",
      )}
    >
      {btnProps.text}
    </button>
  );
}
