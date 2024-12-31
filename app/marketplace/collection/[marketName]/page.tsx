import BuyBag from "./buy-bag";
import { CollectionDisplay } from "./collection-display";

export default function Page() {
  // const pageParams = use(params);
  // const marketName = pageParams.marketName;

  return (
    <div className="px-4 flex w-screen flex-col md:mx-auto md:min-w-[1440px] md:max-w-[1920px] md:flex-row">
      <CollectionDisplay />
      <BuyBag />
    </div>
  );
}
