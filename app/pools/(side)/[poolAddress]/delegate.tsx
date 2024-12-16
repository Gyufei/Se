import { useMemo, useState } from "react";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";

import { NumericalInput } from "@/components/ui/numerical-input";
import { Skeleton } from "@/components/ui/skeleton";
import { RAE } from "@/lib/const/platform";
import { formatNumber } from "@/lib/utils/number";
import { multiply } from "safebase";
import { usePoolDelegate } from "@/lib/web3/call/use-pool-delegate";
import { useApprove } from "@/lib/web3/use-approve";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import ErrorMessage from "@/app/_common/error-message";
import { covertErrorMsg } from "@/lib/utils/error";

export default function Delegate({
  poolId,
  rae: raeBalance,
  poolRaeQueryKey,
}: {
  poolId: string;
  rae: {
    value: number;
    isPending: boolean;
    queryKey: QueryKey;
  };
  poolRaeQueryKey: QueryKey;
}) {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { isShouldApprove, isApproving, approveAction, approveBtnText } =
    useApprove(RAE.address, RAE.symbol);

  const { writeContract, isPending: isDelegatePending } = usePoolDelegate();

  const [depositNum, setDepositNum] = useState("");
  const [numError, setNumError] = useState("");

  function handleInputNum(v: string) {
    setDepositNum(v);
    checkNum(v);
  }

  function checkNum(vNum: string) {
    if (!vNum) {
      setNumError("Enter a number");
      return false;
    }

    if (Number(vNum) > raeBalance.value) {
      setNumError("Insufficient balance");
      return false;
    }

    setNumError("");
    return true;
  }

  function handleDelegate() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    if (!checkNum(depositNum)) {
      return;
    }

    writeContract(
      {
        poolId: poolId,
        delegateNum: multiply(depositNum, String(10 ** RAE.decimals)),
      },
      {
        onSuccess: () => {
          setDepositNum("");
          queryClient.invalidateQueries({ queryKey: raeBalance.queryKey });
          queryClient.invalidateQueries({ queryKey: poolRaeQueryKey });
          setGlobalMsg({
            type: "success",
            message: "Delegate successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "Delegate failed"),
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (isShouldApprove) {
      return {
        text: approveBtnText,
        disabled: isApproving,
      };
    }

    if (isDelegatePending) {
      return {
        text: "Depositing...",
        disabled: true,
      };
    }

    return {
      text: "Deposit",
      disabled: false,
    };
  }, [isShouldApprove, isApproving, approveBtnText, isDelegatePending]);

  return (
    <div className="px-5 pb-5 border-b-2 border-[#ffffff10]">
      <div className="flex justify-between mb-[15px]">
        <div className="text-white text-base opacity-60">Delegate</div>
        <div className="flex items-center text-white text-xs font-medium">
          <span className="opacity-60">Balance:</span>
          {raeBalance.isPending ? (
            <Skeleton className="w-12 h-4" />
          ) : (
            <span>&nbsp;{formatNumber(raeBalance.value || 0)} RAE</span>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <NumericalInput
          className="bg-[#1D0E27] text-base leading-5 text-white h-12 px-4 py-3"
          value={depositNum}
          onUserInput={handleInputNum}
          placeholder="0"
        />
        <RaeToken />
      </div>
      <ErrorMessage error={numError} />

      <ShouldConnectBtn
        disabled={btnProps.disabled}
        className="mt-[15px] w-full"
        onClick={handleDelegate}
      >
        {btnProps.text}
      </ShouldConnectBtn>
    </div>
  );
}
