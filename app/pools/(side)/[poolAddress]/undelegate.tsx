import { useMemo, useState } from "react";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { formatNumber } from "@/lib/utils/number";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { multiply } from "safebase";
import { usePoolUndelegate } from "@/lib/web3/call/use-pool-undelegate";
import { RAE } from "@/lib/const/rae";
import { useSetAtom } from "jotai";
import { GlobalMessageAtom } from "@/lib/state/global-message";

export default function Undelegate({
  poolId,
  poolRae: poolRaeBalance,
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

  function handleUndelegate() {
    writeContract(
      {
        poolId: poolId,
        undelegateNum: multiply(withdrawNum, String(10 ** RAE.decimals)),
      },
      {
        onSuccess: () => {
          setWithdrawNum("");
          queryClient.invalidateQueries({ queryKey: poolRaeBalance.queryKey });
          queryClient.invalidateQueries({ queryKey: raeQueryKey });
          setGlobalMsg({
            type: "success",
            message: "Undelegate successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: e.message || "Undelegate failed",
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (!withdrawNum) {
      return {
        // text: "Enter a number",
        text: "Withdraw",
        disabled: true,
      };
    }

    if (Number(withdrawNum) > Number(poolRaeBalance.value)) {
      return {
        // text: "Insufficient balance",
        text: "Withdraw",
        disabled: true,
      };
    }

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
  }, [withdrawNum, isUndelegatePending, poolRaeBalance.value]);

  return (
    <div className="px-5 pt-5">
      <div className="flex justify-between mb-[15px]">
        <div className="text-white text-base opacity-60">Undelegate</div>
        <div className="text-white text-xs font-medium">
          <span className="opacity-60">Max: </span>
          <span>{formatNumber(poolRaeBalance.value) || 0} RAE</span>
        </div>
      </div>
      <div className="flex justify-between">
        <NumericalInput
          className="bg-[#1D0E27] text-base leading-5 text-white h-12 px-4 py-3"
          value={withdrawNum}
          onUserInput={setWithdrawNum}
          placeholder="0"
        />
        <RaeToken />
      </div>

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
