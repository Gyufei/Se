export default function BidResult({ success }: { success: boolean }) {
  return (
    <div
      className="mt-5 h-20 flex items-center justify-center bg-[#1D0E2750] text-white"
      style={{
        backgroundImage: `url(${success ? "/images/bid-success-shading.png" : "/images/bid-fail.png"})`,
      }}
    >
      <BidResultIcon success={success} />
      <span className="inline-block mx-1 text-xl">
        {success
          ? "Your bidding offer was successful"
          : "Your bidding offer was failed "}
      </span>
      <BidResultIcon success={success} />
    </div>
  );
}

function BidResultIcon({ success }: { success: boolean }) {
  if (success) {
    return <span className="text-base">&#x1F389;</span>;
  } else {
    return <span className="text-base">&#x274C;</span>;
  }
}
