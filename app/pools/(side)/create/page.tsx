"use client";
import { useMemo, useState } from "react";
import { multiply } from "safebase";
import { useSetAtom } from "jotai";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { useCreatePool } from "@/lib/web3/call/use-create-pool";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useQueryClient } from "@tanstack/react-query";
import { escapeHtml } from "@/lib/utils/url";
import ErrorMessage from "@/app/_common/error-message";
import { covertErrorMsg } from "@/lib/utils/error";

export default function Page() {
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);
  const queryClient = useQueryClient();
  const { isPending: isTxPending, write } = useCreatePool();

  const [poolName, setPoolName] = useState("");
  const [bonus, setBonus] = useState("");

  const [poolError, setPoolError] = useState("");
  const [bonusError, setBonusError] = useState("");

  function handlePoolNameInput(v: string) {
    const namePattern = /^[A-Za-z\-']+( [A-Za-z\-']+)*/;

    if (!v || namePattern.test(v)) {
      const vEscaped = escapeHtml(v);

      setPoolName(vEscaped);
      checkPoolName(vEscaped);
    }
  }

  function handleBonusInput(v: string) {
    setBonus(v);
    checkBonus(v);
  }

  function checkPoolName(pValue: string) {
    if (!pValue) {
      setPoolError("Enter A Name");
      return false;
    }

    if (pValue.length < 3) {
      setPoolError("Name must be at least 3 characters");
      return false;
    }

    if (pValue.length > 30) {
      setPoolError("Name must be less than 30 characters");
      return false;
    }

    setPoolError("");
    return true;
  }

  function checkBonus(bValue: string) {
    if (!bValue) {
      setBonusError("Enter a bonus");
      return false;
    }

    if (Number(bValue) >= 100) {
      setBonusError("Bonus must be less than 100");
      return false;
    }

    if (Number(bValue) < 0) {
      setBonusError("Bonus must be greater than 0");
      return false;
    }

    setBonusError("");
    return true;
  }

  async function handleCreatePool() {
    if (!checkPoolName(poolName) || !checkBonus(bonus)) {
      return;
    }

    write(
      { name: poolName, bonus: multiply(bonus, String(100)) },
      {
        onSuccess: () => {
          setPoolName("");
          setBonus("0");
          queryClient.invalidateQueries({ queryKey: ["pools"] });
          setGlobalMsg({
            type: "success",
            message: "Pool created successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "Create pool failed"),
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (isTxPending) {
      return {
        // text: "Creating...",
        text: "Confirming...",
        disabled: true,
      };
    }

    return {
      text: "Confirm",
      disabled: false,
    };
  }, [isTxPending]);

  return (
    <>
      <div className="text-[30px] font-medium text-white pb-5 px-6 border-b-2 border-[#ffffff10]">
        Create Pool
      </div>
      <div className="bg-[#281A31] mx-6 mt-6 p-5">
        <div className="mb-[15px] text-white opacity-60 text-base font-medium">
          Name
        </div>
        <input
          value={poolName}
          onChange={(e) => handlePoolNameInput(e.target.value)}
          className="w-full h-12 text-base leading-5 bg-[#1D0E27] rounded-md px-4 py-3"
          placeholder="Name"
          maxLength={30}
          minLength={3}
        />
        <ErrorMessage className="ml-0" error={poolError} />
        <div className="mt-[23px] mb-[15px] text-white opacity-60 text-base font-medium">
          Creator Bonus
        </div>
        <div className="relative">
          <NumericalInput
            className="bg-[#1D0E27] w-full text-base leading-5 text-white h-12 pl-4 py-3 pr-6"
            value={bonus}
            onUserInput={(v) => handleBonusInput(v)}
            placeholder="0"
          />
          <span className="absolute text-base opacity-40 right-4 top-3">%</span>
        </div>
        <ErrorMessage error={bonusError} />
        <ShouldConnectBtn
          disabled={btnProps?.disabled}
          className="mt-5 mb-[25px] w-full"
          onClick={handleCreatePool}
        >
          {btnProps?.text}
        </ShouldConnectBtn>
      </div>
    </>
  );
}
