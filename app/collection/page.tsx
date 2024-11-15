import BuyBag from "./buy-bag";
import { CollectionDisplay } from "./collection-display";

export default function page() {
  return (
    <div className="flex">
      <CollectionDisplay />
      <BuyBag />
    </div>
  );
}
