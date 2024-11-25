import { formatPercent } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";

const PoolInfo = {
  creator: "0x1234567890",
  fill: 400,
  capacity: 1000,
  myProfit: 30,
  myDelegated: 40,
  myDelegatedPercent: 0.04,
};

export default function PoolInfoCard() {
  return (
    <div className="bg-[#281A31] mx-6 mt-6 p-5">
      <div className="flex justify-between">
        <div>
          <div className="text-white opacity-60 text-base font-medium">
            Creator
          </div>
          <div className="text-2xl mt-[10px] text-white font-medium">
            {truncateAddr(PoolInfo.creator)}
          </div>
        </div>

        <div>
          <div className="text-white opacity-60 text-base font-medium">
            Capacity Saturation
          </div>
          <div className="text-2xl text-right mt-[10px] text-white font-medium">
            <span>{PoolInfo.fill}</span>
            <span className="opacity-60"> / {PoolInfo.capacity}</span>
          </div>
        </div>
      </div>

      <div className="flex mt-[27px] justify-between">
        <div>
          <div className="text-white opacity-60 text-base font-medium">
            My Acc. Profit
          </div>
          <div className="text-2xl mt-[10px] text-white font-medium">
            {PoolInfo.myProfit} RAE
          </div>
        </div>

        <div>
          <div className="text-white opacity-60 text-base font-medium">
            My Delegated
          </div>
          <div className="text-2xl text-right mt-[10px] text-white font-medium">
            <span>{PoolInfo.myDelegated} RAE&nbsp;</span>
            <span>
              {PoolInfo.myDelegatedPercent &&
                `(${formatPercent(PoolInfo.myDelegatedPercent)})`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
