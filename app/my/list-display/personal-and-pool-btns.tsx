import { cn } from "@/lib/utils/common";
import { capitalize } from "lodash";

export type NFTOwnByType = "personal" | "pool";

const nftTypes: Array<NFTOwnByType> = ["personal", "pool"] as const;

export function PersonalAndPoolBtns({
  type,
  setType,
  typeNumbers,
}: {
  type: NFTOwnByType;
  setType: (type: NFTOwnByType) => void;
  typeNumbers: Record<NFTOwnByType, number>;
}) {
  function handleSetType(t: NFTOwnByType) {
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
          <div className="ml-[10px] text-[#11001D] h-5 w-5 flex items-center justify-center text-sm bg-white">
            {typeNumbers[nftType]}
          </div>
        </button>
      ))}
    </div>
  );
}
