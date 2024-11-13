import { cn } from "@/lib/utils/common";
import { truncateAddr } from "@/lib/utils/web3";
import Image from "next/image";

const ConnectBtnText = "h-10 px-5 flex items-center text-[14px] font-bold";

export default function ConnectBtn() {
  const isConnect = true;
  const address = "0x1234567890abcdef1234567890abcdef12345678";

  if (!isConnect) {
    return (
      <button className={cn(ConnectBtnText, "bg-green text-[#12021d]")}>
        Connect Wallet
      </button>
    );
  }

  return (
    <button className={cn(ConnectBtnText, "bg-[#2A1C34] space-x-[10px]")}>
      <Image
        src="/images/mock-nft.png"
        width={20}
        height={20}
        alt="avatar"
        className="rounded-full"
      />
      <div className="text-white opacity-60 hover:opacity-100">
        {truncateAddr(address)}
      </div>
    </button>
  );
}
