import { useMemo, useState } from "react";
import SortSelect, { ISortDirection, ISortType } from "./sort-select";
import SearchInput from "./search-input";
import { range, sortBy } from "lodash";
import NFTCard from "./nft-card";
import { useCollectionPageContext } from "../../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import FilterTypeSelect from "./type-select";
import { INFT } from "@/lib/api/use-market-nfts";

export default function ItemsContent() {
  const { marketNfts, isNftsPending } = useCollectionPageContext();

  const [sortName, setSortName] = useState<ISortType>("price");
  const [sortDirection, setSortDirection] = useState<ISortDirection>("asc");
  const [searchText, setSearchText] = useState("");
  const [filterTypes, setFilterTypes] = useState<Array<INFT["status"] | null>>([]);

  const [showMbFilter, setShowMbFilter] = useState(false);

  const displayNfts = useMemo(() => {
    if (!marketNfts) return [];

    let sortArr = marketNfts;

    if (filterTypes.length) {
      sortArr = sortArr.filter((nft) => filterTypes.includes(nft.status));
    }

    if (sortName === "price") {
      if (sortDirection === "asc") {
        sortArr = sortBy(sortArr, "price");
      } else {
        sortArr = sortBy(sortArr, "price").reverse();
      }
    }

    if (sortName === "rarity") {
      if (sortDirection === "asc") {
        sortArr = sortBy(sortArr, "rarity");
      } else {
        sortArr = sortBy(sortArr, "rarity").reverse();
      }
    }

    if (searchText) {
      sortArr = sortArr.filter((nft) => nft.token_id.includes(searchText));
    }

    return sortArr;
  }, [marketNfts, sortName, sortDirection, searchText, filterTypes]);

  return (
    <>
      <div className="mt-[30px] flex justify-between space-x-4 md:mt-10 md:space-x-0">
        <SortSelect name={sortName} setName={setSortName} dir={sortDirection} setDir={setSortDirection} />

        <div
          className="flex h-12 w-12 items-center justify-center bg-[#382743] md:hidden"
          onClick={() => setShowMbFilter(!showMbFilter)}
        >
          {showMbFilter ? <span className="text-[18px]">⬇️</span> : <span className="text-[18px]">🔍</span>}
        </div>

        <div className="hidden items-center space-x-5 md:flex">
          <FilterTypeSelect filterTypes={filterTypes} setFilterTypes={setFilterTypes} />
          <SearchInput value={searchText} onChange={setSearchText} />
        </div>
      </div>
      {showMbFilter && (
        <div className="mt-4 flex items-center justify-between space-x-5 md:hidden">
          <FilterTypeSelect filterTypes={filterTypes} setFilterTypes={setFilterTypes} />
          <SearchInput value={searchText} onChange={setSearchText} />
        </div>
      )}
      <div className="no-scroll-bar mt-5 grid max-h-[600px] min-h-[270px] grid-cols-2 gap-5 overflow-y-auto overflow-x-hidden md:grid-cols-4">
        {isNftsPending
          ? range(8).map((i) => <Skeleton key={i} className="h-[260px] w-[200px]" />)
          : displayNfts.map((nft) => <NFTCard key={nft.token_id} nft={nft} />)}
      </div>
    </>
  );
}
