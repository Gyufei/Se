import { truncateAddr } from "@/lib/utils/web3";
import { capitalize } from "lodash";
import Image from "next/image";

const winner = {
  avatar: "/images/mock-avatar.png",
  type: "pool",
  addr: "0x1234567890abcdef1234567890abcdef12345678",
};

export default function WonBy() {
  return (
    <div className="p-5 bg-[#281a31] mt-6">
      <div className="text-base text-white font-medium">Vault was won by</div>
      <div className="h-14 px-4 flex items-center space-x-3 bg-[#1D0E27] mt-[15px]">
        <Image src={winner.avatar} alt="avatar" width={24} height={24} />
        <span className="text-white text-base font-medium">
          {capitalize(winner.type)}: {truncateAddr(winner.addr)}
        </span>
      </div>
    </div>
  );
}
