import { useEffect, useMemo } from "react";
import { erc20Abi, isAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { USDTAbi } from "@/lib/abi/USDT";
import { useChainConfig } from "./use-chain-config";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "../state/global-message";
import { covertErrorMsg } from "../utils/error";

export function useApprove(tokenAddr: string | undefined, tokenSymbol: string) {
  const { chainConfig } = useChainConfig();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const allowAmount: number = 0;
  const spender = chainConfig.contracts.TesseraRouter;

  const { address: walletAccount } = useAccount();

  const isCanApprove = useMemo(() => {
    if (!tokenAddr || !isAddress(tokenAddr)) return false;

    if (tokenSymbol === "ETH") return false;

    if (!walletAccount || !spender) return false;

    return true;
  }, [walletAccount, spender, tokenAddr, tokenSymbol]);

  const mutation = useWriteContract();
  const confirmMutation = useWaitForTransactionReceipt({
    hash: mutation.data,
    query: {
      enabled: !!mutation.data,
    },
  });
  const allowanceMutation = useReadContract({
    abi: erc20Abi,
    address: tokenAddr as any,
    functionName: "allowance",
    args: [walletAccount!, spender as any],
    query: {
      enabled: isCanApprove,
    },
  });

  const isApproving =
    mutation.isPending ||
    (mutation.isSuccess && confirmMutation.isPending) ||
    (confirmMutation.isSuccess &&
      (allowanceMutation.isPending || allowanceMutation.isRefetching));

  const allowance = allowanceMutation.data;
  const isAllowanceLoading = allowanceMutation.isLoading;

  useEffect(() => {
    if (confirmMutation.isSuccess) {
      allowanceMutation?.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmMutation.isSuccess]);

  const isShouldApprove = useMemo(() => {
    if (!isCanApprove) return false;

    if (isAllowanceLoading) return false;
    if (allowance == null || isAllowanceLoading) return false;
    if (Number(allowance) === 0) return true;
    if (Number(allowance) < allowAmount) return true;

    return false;
  }, [allowance, allowAmount, isCanApprove, isAllowanceLoading]);

  const approveBtnText = useMemo(() => {
    if (!isCanApprove) return "";

    if (isApproving) {
      return `Approving ${tokenSymbol}...`;
    }

    if (isShouldApprove) {
      return `Approve ${tokenSymbol}`;
    }

    return "";
  }, [isCanApprove, isShouldApprove, tokenSymbol, isApproving]);

  async function approveAction() {
    try {
      if (!isCanApprove) return () => {};

      const isUSDT = tokenSymbol === "USDT";
      const amountMax =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      const amount = isUSDT ? (allowAmount == 0 ? amountMax : "0") : amountMax;

      const callParams = {
        abi: isUSDT ? USDTAbi : erc20Abi,
        address: tokenAddr as any,
        functionName: "approve",
        args: [spender, amount],
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
    } catch (e) {
      setGlobalMsg({
        type: "error",
        message: covertErrorMsg(e, "Approve failed"),
      });
    }
  }

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
