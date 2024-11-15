import Image from "next/image";
import { useMemo, useState } from "react";
import { NFTOwnByType } from "./personal-and-pool-btns";
import { Pagination } from "@/components/ui/pagination/pagination";

const myCollections = [
  {
    name: "Cryptopunks",
    nfts: [
      {
        id: 1,
        imgSrc: "/images/mock-nft.png",
      },
      {
        id: 2,
        imgSrc: "/images/mock-nft.png",
      },
      {
        id: 3,
        imgSrc: "/images/mock-nft.png",
      },
    ],
  },
  {
    name: "Azuki",
    nfts: [
      {
        id: 5,
        imgSrc: "/images/mock-nft.png",
      },
      {
        id: 6,
        imgSrc: "/images/mock-nft.png",
      },
      {
        id: 7,
        imgSrc: "/images/mock-nft.png",
      },
    ],
  },
];

export default function NftList({ type }: { type: NFTOwnByType }) {
  console.log(type);

  const displayList = useMemo(() => {
    return myCollections;
  }, []);

  const totalPages = useMemo(() => {
    const all = myCollections.map((c) => c.nfts).flat();

    return Math.ceil(all.length / 6);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-[30px]">
      {displayList.map((coll, idx) => (
        <div className="mb-10" key={idx}>
          <div className="text-xl font-medium text-white">{coll.name}</div>
          <div className="mt-[15px] pr-[10px] flex flex-wrap justify-between space-x-5">
            {coll.nfts.map((nft, idx) => (
              <div
                key={idx}
                className="border-2 border-transparent cursor-pointer hover:border-green h-[200px] w-[200px]"
              >
                <Image src={nft.imgSrc} width={200} height={200} alt="nft" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Pagination
        totalPages={totalPages}
        edgePageCount={3}
        middlePagesSiblingCount={1}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      >
        <Pagination.PrevButton />

        <nav className="mx-2 flex items-center justify-center">
          <ul className="flex items-center gap-2">
            <Pagination.PageButton
              activeClassName=""
              inactiveClassName=""
              className=""
            />
          </ul>
        </nav>

        <Pagination.NextButton />
      </Pagination>
    </div>
  );
}
