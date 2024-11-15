import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { formatNumber } from "@/lib/utils/number";
import Image from "next/image";

const nftPrice = 3.83;
const raePrice = 2342.34;
const priceValue = nftPrice * raePrice;
const isCanList = true;
const isCanVault = false;
const isCanAdd = !isCanList && !isCanVault;

export default function PriceAndOperation() {
  return (
    <div className="bg-[#281A31] p-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <span className="text-[#B8B3B6]">Price</span>
        <Image
          src="/icons/logo-on-white.svg"
          width={20}
          height={20}
          alt="logo"
        />
      </div>
      <div className="flex mt-[10px] mb-5 items-center justify-between">
        <div className="text-[40px] text-white">{nftPrice} RAE</div>
        <div className="text-white opacity-60 text-xl">
          ~ ${formatNumber(priceValue)}
        </div>
      </div>

      {isCanAdd && <AddToBagBtn />}
      {isCanList && <ListOntoQuickBtn />}
      {isCanVault && <VaultOntoLuckyBtn />}
    </div>
  );
}

function AddToBagBtn() {
  return (
    <button className="bg-green w-full flex items-center justify-center h-12 text-[#12021D] mt-[10px] text-base font-bold">
      Add to Bag +
    </button>
  );
}

function ListOntoQuickBtn() {
  function handleList() {}

  return (
    <ShouldConnectBtn className="w-full" onClick={handleList}>
      List onto Quick Market
    </ShouldConnectBtn>
  );
}

function VaultOntoLuckyBtn() {
  function handleVault() {}

  return (
    <ShouldConnectBtn className="w-full" onClick={handleVault}>
      Vault onto Lucky Market
    </ShouldConnectBtn>
  );
}
