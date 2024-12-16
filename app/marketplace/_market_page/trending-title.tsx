export default function TrendingTitle({ marketType }: { marketType: string; }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl">
        <span className="text-white">Trending Assets on</span>
        <span className="inline-block ml-3 text-green">
          {marketType} Market
        </span>
      </div>
      <div className="flex items-center text-base text-white">
        <span>Got questions?</span>
        <span className="inline-block ml-1 tessera-underline">
          Check our FAQ
        </span>
      </div>
    </div>
  );
}
