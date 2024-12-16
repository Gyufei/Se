import PathBreadcrumb from "@/app/_common/path-breadcrumb";
import DetailTabs from "./detail-tabs";
import { useLuckyNFTPageContext } from "../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import NftFallbackImage  from "@/app/_common/nft-fallback-image";

export default function DetailContainer() {
  const { nftInfo, isMarketAndNftPending } = useLuckyNFTPageContext();

  return (
    <div className="mt-12 mb-10 flex-1 flex justify-center">
      <div className="w-[580px]">
        {isMarketAndNftPending || !nftInfo ? (
          <>
            <Skeleton className="h-6 w-[280px]" />
            <Skeleton className="mt-5 h-[580px] w-[580px]" />
          </>
        ) : (
          <>
            <PathBreadcrumb
              paths={[
                "Lucky Market",
                `${nftInfo.market_name} NO.${nftInfo.token_id}`,
              ]}
              isLoadings={[false, isMarketAndNftPending]}
            />

            <NftFallbackImage
              className="mt-5"
              src={nftInfo.token_uri}
              width={580}
              height={580}
              alt="nft"
            />
          </>
        )}
        <DetailTabs />
      </div>
    </div>
  );
}
