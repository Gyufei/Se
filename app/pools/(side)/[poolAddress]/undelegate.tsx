import { useMemo, useState } from "react";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { formatNumber } from "@/lib/utils/number";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { multiply } from "safebase";
import { usePoolUndelegate } from "@/lib/web3/call/use-pool-undelegate";
import { RAE } from "@/lib/const/platform";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import ErrorMessage from "@/app/_common/error-message";
import { covertErrorMsg } from "@/lib/utils/error";

export default function Undelegate({
  poolId,
  poolRae,
  raeQueryKey,
}: {
  poolId: string;
  poolRae: {
    value: string;
    isPending: boolean;
    queryKey: QueryKey;
  };
  raeQueryKey: QueryKey;
}) {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { writeContract, isPending: isUndelegatePending } = usePoolUndelegate();

  const [withdrawNum, setWithdrawNum] = useState("");
  const [numError, setNumError] = useState("");

  function handleInputNum(v: string) {
    setWithdrawNum(v);
    checkNum(v);
  }

  function checkNum(vNum: string) {
    if (!vNum) {
      setNumError("Enter a number");
      return false;
    }

    if (Number(vNum) <= 0) {
      setNumError("Should be greater than 0");
      return false;
    }

    if (Number(vNum) > Number(poolRae.value)) {
      setNumError("Insufficient balance");
      return false;
    }

    setNumError("");
    return true;
  }

  function handleUndelegate() {
    if (!checkNum(withdrawNum)) {
      return;
    }

    writeContract(
      {
        poolId: poolId,
        undelegateNum: multiply(withdrawNum, String(10 ** RAE.decimals)),
      },
      {
        onSuccess: () => {
          setWithdrawNum("");
          queryClient.invalidateQueries({ queryKey: poolRae.queryKey });
          queryClient.invalidateQueries({ queryKey: raeQueryKey });
          setGlobalMsg({
            type: "success",
            message: "Undelegate successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "Undelegate failed"),
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (isUndelegatePending) {
      return {
        text: "Withdrawing...",
        disabled: true,
      };
    }

    return {
      text: "Withdraw",
      disabled: false,
    };
  }, [isUndelegatePending]);

  return (
    <div className="px-5 pt-5">
      <div className="flex justify-between mb-[15px]">
        <div className="text-white text-base opacity-60">Undelegate</div>
        <div className="text-white text-xs font-medium">
          <span className="opacity-60">Max: </span>
          <span>{formatNumber(poolRae.value) || 0} RAE</span>
        </div>
      </div>
      <div className="flex justify-between">
        <NumericalInput
          className="bg-[#1D0E27] text-base leading-5 text-white h-12 px-4 py-3"
          value={withdrawNum}
          onUserInput={handleInputNum}
          placeholder="0"
        />
        <RaeToken />
      </div>
      <ErrorMessage error={numError} />

      <ShouldConnectBtn
        disabled={btnProps.disabled}
        className="mt-[15px] w-full"
        onClick={handleUndelegate}
      >
        {btnProps.text}
      </ShouldConnectBtn>
    </div>
  );
}
