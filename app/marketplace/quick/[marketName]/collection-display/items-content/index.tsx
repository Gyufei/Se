import { useState } from "react";
import SortSelect, { ISortDirection, ISortType } from "./sort-select";
import SearchInput from "./search-input";
import { range } from "lodash";
import NFTCard from "./nft-card";

export default function ItemsContent() {
  const [sortName, setSortName] = useState<ISortType>("price");
  const [sortDirection, setSortDirection] = useState<ISortDirection>("asc");

  return (
    <>
      <div className="flex justify-between mt-10">
        <SortSelect
          name={sortName}
          setName={setSortName}
          dir={sortDirection}
          setDir={setSortDirection}
        />
        <SearchInput />
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {range(22).map((i) => (
          <NFTCard key={i} />
        ))}
      </div>
    </>
  );
}
