const hasBid = 400;
const bidValue = 1000;

export default function BidProgress() {
  return (
    <div className="pt-5 pb-6 px-5 flex flex-col items-center border-b-[2px] border-b-[#ffffff10]">
      <div className="text-white opacity-60 font-medium">Bidding Progress</div>
      <div className="text-[40px] text-white mt-5 font-bold">
        {hasBid} / {bidValue} RAE
      </div>
      <ArrowProgress percent={hasBid / bidValue} />
      <div className="mt-[15px] text-xs font-medium">
        <span className="text-white opacity-80 ">
          lf at least 1 Rae is remaining in the offer by the end of the time
          period.the NFT(s) in the vault will be listed to be purchased.
        </span>
        <span className="inline-block ml-2 cursor-pointer underline decoration-green text-white">
          Read More
        </span>
      </div>
    </div>
  );
}

function ArrowProgress({ percent }: { percent: number }) {
  return (
    <div className="relative w-full mt-5">
      <div
        className="w-full h-2 rounded-[4px]"
        style={{
          background: "linear-gradient(270deg, #77EF00 0%, #FE0027 100%)",
        }}
      ></div>

      <div
        className="absolute flex flex-col items-center -top-[14px]"
        style={{
          transform: "translateX(-50%)",
          left: `${percent * 100}%`,
        }}
      >
        <div className="h-3 w-3 flex items-center justify-center">
          <div className="w-0 h-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-white"></div>
        </div>
        <div className="w-[2px] h-3 bg-white"></div>
      </div>
    </div>
  );
}
