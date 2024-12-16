import { Skeleton } from "@/components/ui/skeleton";
import { truncateAddr } from "@/lib/utils/web3";

export default function NftSeller({
  isPending,
  seller,
}: {
  isPending: boolean;
  seller?: string;
}) {
  if (isPending) return <Skeleton className="mt-[10px] h-6 w-[200px]" />;

  return (
    <div className="mt-[10px] text-xl text-white opacity-60">
      Seller: {truncateAddr(seller)}
    </div>
  );
}
