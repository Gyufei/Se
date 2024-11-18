"use client";
import { useState } from "react";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/share/numerical-input";

export default function Page() {
  const [poolName, setPoolName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [bonus, setBonus] = useState("");

  function handleCreatePool() {}

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
        <div className="mt-5 mb-[15px] text-white opacity-60 text-base font-medium">
          Capacity
        </div>
        <div className="flex items-center space-x-[15px]">
          <NumericalInput
            className="bg-[#1D0E27] text-base leading-5 text-white h-12 px-4 py-3"
            value={capacity}
            onUserInput={setCapacity}
            placeholder="0"
          />
          <RaeToken />
        </div>
        <div className="mt-[23px] mb-[15px] text-white opacity-60 text-base font-medium">
          Capacity
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
          className="mt-5 mb-[25px] w-full"
          onClick={handleCreatePool}
        >
          Confirm
        </ShouldConnectBtn>
      </div>
    </>
  );
}
