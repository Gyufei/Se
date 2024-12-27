import Qa from "./qa";

export default function TrendingTitle({ marketType }: { marketType: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[18px] md:text-xl">
        <span className="text-white">Trending Assets on</span>
        <span className="ml-3 inline-block text-green">{marketType} Market</span>
      </div>
      <Qa className="hidden md:flex" />
    </div>
  );
}
