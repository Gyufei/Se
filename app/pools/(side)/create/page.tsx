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
      <div className="flex h-14 items-center justify-center border-b-0 text-[18px] font-bold text-white md:h-auto md:justify-start md:border-b-2 md:border-[#ffffff10] md:px-6 md:pb-5 md:text-[30px] md:font-medium">
        Create Pool
      </div>
      <div className="relative mx-0 mt-4 bg-[#281A31] p-5 md:mx-6 md:mt-6">
        <div className="mb-[15px] text-base font-medium text-white opacity-60">Name</div>
        <input
          value={poolName}
          onChange={(e) => handlePoolNameInput(e.target.value)}
          className="h-12 w-full rounded-md bg-[#1D0E27] px-4 py-3 text-base leading-5"
          placeholder="Name"
          maxLength={30}
          minLength={3}
        />
        <ErrorMessage className="absolute top-[98px] ml-0" error={poolError} />
        <div className="mb-[15px] mt-[23px] text-base font-medium text-white opacity-60">Creator Bonus</div>
        <div className="relative">
          <NumericalInput
            className="h-12 w-full bg-[#1D0E27] py-3 pl-4 pr-6 text-base leading-5 text-white"
            value={bonus}
            onUserInput={(v) => handleBonusInput(v)}
            placeholder="0"
          />
          <span className="absolute right-4 top-3 text-base opacity-40">%</span>
        </div>
        <ErrorMessage className="absolute -bottom-[94px] ml-0" error={bonusError} />
        <ShouldConnectBtn disabled={btnProps?.disabled} className="mb-[25px] mt-5 w-full" onClick={handleCreatePool}>
          {btnProps?.text}
        </ShouldConnectBtn>
      </div>
    </>
  );
}
