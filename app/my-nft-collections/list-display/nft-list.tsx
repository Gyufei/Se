import Image from "next/image";
import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/pagination/pagination";
import { NftOwnerType, useMyNFTCollectionsPageContext } from "../page-context";
import { INFT } from "@/lib/api/use-market-nfts";
import { chunk, flatten, groupBy, range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { removeQueryParams } from "@/lib/utils/url";
import Empty from "@/app/_common/empty";
import Link from "next/link";

function getPagesNfts(nfts: INFT[]) {
  if (!nfts?.length) return [[]];

  const groupByMarketName = groupBy(nfts, (nft) => nft.market_name);
  const marketNfts = Object.values(groupByMarketName);
  const marketRowNfts = marketNfts.map((nfts) => chunk(nfts, 3));
  const twoRowNfts = chunk(flatten(marketRowNfts), 2);

  const pageGroupNfts = [];
  for (const page of twoRowNfts) {
    if (page.length < 2) {
      pageGroupNfts.push([
        {
          market_name: page[0][0].market_name,
          nfts: flatten(page),
        },
      ]);
    } else {
      if (page[0][0].market_name === page[1][0].market_name) {
        pageGroupNfts.push([
          {
            market_name: page[0][0].market_name,
            nfts: flatten(page),
          },
        ]);
      } else {
        pageGroupNfts.push([
          {
            market_name: page[0][0].market_name,
            nfts: flatten(page[0]),
          },
          {
            market_name: page[1][0].market_name,
            nfts: flatten(page[1]),
          },
        ]);
      }
    }
  }

  return pageGroupNfts;
}

export default function NftList({ type }: { type: NftOwnerType }) {
  const { myNfts, poolNfts, isPending, selectedNft, setSelectedNft } =
    useMyNFTCollectionsPageContext();

  const [currentPage, setCurrentPage] = useState(0);

  const pageNfts = useMemo(() => {
    const pageList = getPagesNfts(type === "personal" ? myNfts : poolNfts);
    return pageList;
  }, [type, myNfts, poolNfts]);

  const displayNftList = useMemo(() => {
    if (!pageNfts?.length) return [];

    return pageNfts[currentPage];
  }, [pageNfts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectNft = (nft: INFT) => {
    removeQueryParams(["marketName", "nftId", "action"]);
    setSelectedNft(nft);
  };

  return (
    <div className="mt-[30px]">
      <div className="min-h-[500px]">
        {isPending ? (
          <>
            <Skeleton className="w-[100px] h-5 my-2" />
            <div className="mt-[15px] pr-[10px] grid grid-cols-3 gap-x-5">
              {range(5).map((i) => (
                <Skeleton
                  style={{ marginTop: i > 2 ? "80px" : "0" }}
                  key={i}
                  className="h-[200px] w-[200px]"
                />
              ))}
            </div>
          </>
        ) : displayNftList?.length ? (
          displayNftList.map((market, idx) => (
            <div className="mb-10" key={idx}>
              <Link
                href={`/marketplace/collection/${market.market_name}`}
                className="text-xl font-medium text-white tessera-underline cursor-pointer hover:text-green transition-colors"
              >
                {market.market_name}
              </Link>
              <div className="mt-[15px] pr-[10px] grid grid-cols-3 gap-x-5">
                {market.nfts.map((nft, idx) => (
                  <div
                    onClick={() => handleSelectNft(nft)}
                    key={idx}
                    data-active={
                      selectedNft?.token_id === nft.token_id &&
                      selectedNft?.market_name === nft.market_name
                    }
                    className="border-2 border-transparent cursor-pointer hover:border-green data-[active=true]:border-green h-[200px] w-[200px]"
                    style={{ marginTop: idx > 2 ? "80px" : "0" }}
                  >
                    <Image
                      src={nft.token_uri}
                      width={200}
                      height={200}
                      alt="nft"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Empty
            className="h-[300px] items-center text-2xl"
            text="No NFTs found"
          />
        )}
      </div>

      {displayNftList?.length > 0 && (
        <Pagination
          totalPages={pageNfts?.length || 0}
          edgePageCount={3}
          middlePagesSiblingCount={1}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          className="justify-start"
        >
          {currentPage > 1 && <Pagination.PrevButton />}
          <nav className="mx-2 flex items-center justify-center">
            <ul className="flex items-center gap-2">
              {isPending ? (
                range(3).map((i) => <Skeleton key={i} className="h-5 w-5" />)
              ) : (
                <Pagination.PageButton
                  activeClassName=""
                  inactiveClassName=""
                  className=""
                />
              )}
            </ul>
          </nav>
          {currentPage < pageNfts?.length - 1 && <Pagination.NextButton />}
        </Pagination>
      )}
    </div>
  );
}
