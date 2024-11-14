import CollectionInfo from "./collection-info";
import CollectionPrice from "./collection-price";

export function CollectionDisplay() {
  return (
    <div className="flex-1 flex justify-center mt-11 mb-20">
      <div className="w-[860px]">
        <CollectionInfo />
        <CollectionPrice />
      </div>
    </div>
  );
}
