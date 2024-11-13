import Image from "next/image";

export default function OptimisticBuyout() {
  return (
    <div className="mt-5 h-12 bg-[#281A31] px-5 flex items-center justify-between">
      <div className="flex items-center">
        <span>⚙️</span>
        <span className="text-white text-base font-medium inline-block ml-2">
          Optimistic Buyout
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-white opacity-60">How it works</span>
        <Image
          src="/icons/plus.svg"
          width={20}
          height={20}
          alt="plus"
          className="opacity-60"
        />
      </div>
    </div>
  );
}
