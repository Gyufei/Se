import HomeCap from "./_market_page/home-cap";
import TrendingAssets from "./_market_page/trending-assets";

export default function Page() {
  return (
    <div className="mx-4 my-8 w-auto px-4 md:mx-auto md:mb-[120px] md:mt-[140px] md:w-[1000px] md:px-0">
      <HomeCap />
      <TrendingAssets />
    </div>
  );
}
