import HomeCap from "./home-cap";
import TrendingAssets from "./trending-assets";

export default function Home() {
  return (
    <div className="w-[1000px] mt-[140px] mb-[120px] mx-auto">
      <HomeCap />
      <TrendingAssets />
    </div>
  );
}
