import HomeCap from "./_market_page/home-cap";
import TrendingAssets from "./_market_page/trending-assets";

export default function Page() {
  return (
    <div className="w-[1000px] mt-[140px] mb-[120px] mx-auto">
      <HomeCap />
      <TrendingAssets />
    </div>
  );
}
