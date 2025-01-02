import CollectionInfo from "./collection-info";
import CollectionPrice from "./collection-price";
import CollectionTabs from "./collection-tabs";

export function CollectionDisplay() {
  return (
    <div className="mb-14 mt-4 flex flex-1 justify-center md:mb-20 md:mt-11">
      <div className="w-full md:w-[860px]">
        <CollectionInfo />
        <CollectionPrice />
        <CollectionTabs />
      </div>
    </div>
  );
}
