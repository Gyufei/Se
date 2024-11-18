import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/share/numerical-input";
import { useState } from "react";

const MyRaeBalance = 8.2313401;
const DelegateBalance = 8.2313401;

export default function DelegateAction() {
  const [depositNum, setDepositNum] = useState("");
  const [withdrawNum, setWithdrawNum] = useState("");

  function handleDelegate() {}

  function handleUnDelegate() {}

  return (
    <div className="bg-[#281A31] mx-6 mt-5 py-5">
      <div className="px-5 pb-5 border-b-2 border-[#ffffff10]">
        <div className="flex justify-between mb-[15px]">
          <div className="text-white text-base opacity-60">Delegate</div>
          <div className="text-white text-xs font-medium">
            <span className="opacity-60">Balance: </span>
            <span>{MyRaeBalance} RAE</span>
          </div>
        </div>
        <div className="flex justify-between">
          <NumericalInput
            className="bg-[#1D0E27] text-base leading-5 text-white h-12 px-4 py-3"
            value={depositNum}
            onUserInput={setDepositNum}
            placeholder="0"
          />
          <RaeToken />
        </div>

        <ShouldConnectBtn className="mt-[15px] w-full" onClick={handleDelegate}>
          Deposit
        </ShouldConnectBtn>
      </div>

      <div className="px-5 pt-5">
        <div className="flex justify-between mb-[15px]">
          <div className="text-white text-base opacity-60">Undelegate</div>
          <div className="text-white text-xs font-medium">
            <span className="opacity-60">Max: </span>
            <span>{DelegateBalance} RAE</span>
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
          className="mt-[15px] w-full"
          onClick={handleUnDelegate}
        >
          Withdraw
        </ShouldConnectBtn>
      </div>
    </div>
  );
}
