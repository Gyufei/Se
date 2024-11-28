import { cn } from "@/lib/utils/common";
import { capitalize } from "lodash";
import { NftOwnerType } from "../page-context";
import { Skeleton } from "@/components/ui/skeleton";

const nftTypes: Array<NftOwnerType> = ["personal", "pool"] as const;

export function PersonalAndPoolBtns({
  isPending,
  type,
  setType,
  typeNumbers,
}: {
  isPending: boolean;
  type: NftOwnerType;
  setType: (type: NftOwnerType) => void;
  typeNumbers: Record<NftOwnerType, number>;
}) {
  function handleSetType(t: NftOwnerType) {
    setType(t);
  }

  return (
    <div className="mt-5 flex items-center space-x-[15px]">
      {nftTypes.map((nftType, idx) => (
        <button
          className={cn(
            "h-[38px] px-3 flex items-center border-2 bg-[#1D0F28]",
            type === nftType ? "border-green" : "border-transparent",
          )}
          onClick={() => handleSetType(nftType)}
          key={idx}
        >
          <span>{capitalize(nftType)}</span>
          {isPending ? (
            <Skeleton className="ml-[10px] h-5 w-5" />
          ) : (
            <div className="ml-[10px] text-[#11001D] h-5 w-5 flex items-center justify-center text-sm bg-white">
              {typeNumbers[nftType]}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
