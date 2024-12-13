import { useEffect, useMemo } from "react";
import { erc721Abi, isAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useChainConfig } from "./use-chain-config";
import { covertErrorMsg } from "../utils/error";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "../state/global-message";

export function useApproveNft(
  nftAddr: string | undefined,
  nftId: string | undefined,
  nftName: string | undefined,
) {
  const { chainConfig } = useChainConfig();
  const spender = chainConfig.contracts.TesseraRouter;
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { address: walletAccount } = useAccount();

  const isCanApprove = useMemo(() => {
    if (!nftAddr || !isAddress(nftAddr) || !nftId) return false;
    if (!walletAccount || !spender) return false;

    return true;
  }, [walletAccount, spender, nftAddr, nftId]);

  const mutation = useWriteContract();
  const confirmMutation = useWaitForTransactionReceipt({
    hash: mutation.data,
    query: {
      enabled: !!mutation.data,
    },
  });
  const allowanceMutation = useReadContract({
    abi: erc721Abi,
    address: nftAddr as any,
    functionName: "allowance" as any,
    args: [walletAccount!, spender as any],
    query: {
      enabled: isCanApprove,
    },
  });

  const isApproved = !!allowanceMutation.data;
  const isApprovedLoading = allowanceMutation.isLoading;

  const isApproving =
    mutation.isPending ||
    (mutation.isSuccess && confirmMutation.isPending) ||
    (confirmMutation.isSuccess &&
      (allowanceMutation.isPending || allowanceMutation.isRefetching));

  useEffect(() => {
    if (confirmMutation.isSuccess) {
      allowanceMutation?.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmMutation.isSuccess]);

  const isShouldApprove = useMemo(() => {
    if (!isCanApprove) return false;
    if (isApproved || isApprovedLoading) return false;
    if (!isApproved) return true;

    return false;
  }, [isApproved, isCanApprove, isApprovedLoading]);

  const approveBtnText = useMemo(() => {
    if (!isCanApprove) return "";

    if (isApproving) {
      return `Approving ${nftName}...`;
    }

    if (isShouldApprove) {
      return `Approve ${nftName}`;
    }

    return "";
  }, [isCanApprove, isShouldApprove, nftName, isApproving]);

  async function approveAction() {
    try {
      if (!isCanApprove) return () => {};

      const callParams = {
        abi: erc721Abi,
        address: nftAddr as any,
        functionName: "approve",
        args: [spender, BigInt(nftId!)],
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
