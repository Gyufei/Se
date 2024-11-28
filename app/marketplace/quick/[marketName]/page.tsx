import BuyBag from "./buy-bag";
import { CollectionDisplay } from "./collection-display";

export default function Page() {
  // const pageParams = use(params);
  // const marketName = pageParams.marketName;

  return (
    <div className="flex min-w-[1440px] overflow-x-aut">
      <CollectionDisplay />
      <BuyBag />
    </div>
  );
}
