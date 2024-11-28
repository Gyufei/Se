"use client";
import { useMemo, useState } from "react";
import { multiply } from "safebase";
import { useSetAtom } from "jotai";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { useCreatePool } from "@/lib/web3/call/use-create-pool";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);
  const queryClient = useQueryClient();
  const { isPending: isTxPending, write } = useCreatePool();

  const [poolName, setPoolName] = useState("");
  const [bonus, setBonus] = useState("");

  const btnProps = useMemo(() => {
    if (!poolName) {
      return {
        text: "Enter A Name",
        disabled: true,
      };
    }

    if (!bonus) {
      return {
        text: "Enter A Bonus",
        disabled: true,
      };
    }

    if (Number(bonus) >= 100) {
      return {
        text: "Invalid creator bonus",
        disabled: true,
      };
    }

    if (isTxPending) {
      return {
        text: "Creating...",
        disabled: true,
      };
    }

    return {
      text: "Confirm",
      disabled: false,
    };
  }, [isTxPending, poolName, bonus]);

  async function handleCreatePool() {
    write(
      { name: poolName, bonus: multiply(bonus, String(100)) },
      {
        onSuccess: () => {
          setPoolName("");
          setBonus("0");
          queryClient.invalidateQueries({ queryKey: ["pools"] });
          setGlobalMsg({
            type: "success",
            message: "Swap successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: e.message || "Create pool failed",
          });
        },
      },
    );
  }

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
          onChange={(e) => setPoolName(e.target.value)}
          className="w-full h-12 text-base leading-5 bg-[#1D0E27] rounded-md px-4 py-3"
          placeholder="Name"
        />
        <div className="mt-[23px] mb-[15px] text-white opacity-60 text-base font-medium">
          Creator Bonus
        </div>
        <div className="relative">
          <NumericalInput
            className="bg-[#1D0E27] w-full text-base leading-5 text-white h-12 pl-4 py-3 pr-6"
            value={bonus}
            onUserInput={setBonus}
            placeholder="0"
          />
          <span className="absolute text-base opacity-40 right-4 top-3">%</span>
        </div>
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
