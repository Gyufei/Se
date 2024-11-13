export default function TrendingAssets() {
  const assets = [1, 2, 3];

  return (
    <>
      <div className="mt-[100px]">
        <TrendingTitle marketType="Lucky" />
        <div className="flex mt-5 items-center justify-between">
          {assets.map((_, index) => (
            <AssetItem key={index} />
          ))}
        </div>
      </div>
      <div className="mt-[100px]">
        <TrendingTitle marketType="Quick" />
        <div className="flex mt-5 items-center justify-between">
          {assets.map((_, index) => (
            <AssetItem key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

function TrendingTitle({ marketType }: { marketType: string }) {
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
        <span className="inline-block ml-1 underline decoration-solid decoration-green">
          Check our FAQ
        </span>
      </div>
    </div>
  );
}

function AssetItem() {
  return <div className="w-80 h-[172px] bg-[#2A1C34]"></div>;
}
