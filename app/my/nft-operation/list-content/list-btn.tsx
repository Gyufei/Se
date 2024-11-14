import { useState } from "react";
import SelectPoolPop from "@/app/_common/select-pool-pop";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";

const isConnect = true;

export default function ListBtn() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  function handleList() {}

  return (
    <div className="flex items-center justify-between mt-5 space-x-5">
      <ShouldConnectBtn className="w-full" onClick={handleList}>
        List onto Quick Market
      </ShouldConnectBtn>
      {isConnect && (
        <SelectPoolPop
          selectedPool={selectedPool}
          setSelectedPool={setSelectedPool}
        />
      )}
    </div>
  );
}
