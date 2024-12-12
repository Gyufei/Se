import { useMemo, useState } from "react";
import SortSelect, { ISortDirection, ISortType } from "./sort-select";
import SearchInput from "./search-input";
import { range, sortBy } from "lodash";
import NFTCard from "./nft-card";
import { useQuickPageContext } from "../../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import FilterTypeSelect from "./type-select";
import { INFT } from "@/lib/api/use-market-nfts";

export default function ItemsContent() {
  const { marketNfts, isNftsPending } = useQuickPageContext();

  const [sortName, setSortName] = useState<ISortType>("price");
  const [sortDirection, setSortDirection] = useState<ISortDirection>("asc");
  const [searchText, setSearchText] = useState("");
  const [filterTypes, setFilterTypes] = useState<Array<INFT["status"] | null>>(
    [],
  );

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

  console.log(displayNfts);

  return (
    <>
      <div className="flex justify-between mt-10">
        <SortSelect
          name={sortName}
          setName={setSortName}
          dir={sortDirection}
          setDir={setSortDirection}
        />

        <div className="flex items-center space-x-5">
          <FilterTypeSelect
            filterTypes={filterTypes}
            setFilterTypes={setFilterTypes}
          />
          <SearchInput value={searchText} onChange={setSearchText} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {isNftsPending
          ? range(8).map((i) => (
              <Skeleton key={i} className="w-[200px] h-[260px]" />
            ))
          : displayNfts.map((nft) => <NFTCard key={nft.token_id} nft={nft} />)}
      </div>
    </>
  );
}
