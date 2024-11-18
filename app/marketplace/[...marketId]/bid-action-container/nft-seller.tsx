import { truncateAddr } from "@/lib/utils/web3";

export default function NftSeller() {
  const seller = "0x1234567890abcdef1234567890abcdef12345678";

  return (
    <div className="mt-[10px] text-xl text-white opacity-60">
      Seller: {truncateAddr(seller)}
    </div>
  );
}
