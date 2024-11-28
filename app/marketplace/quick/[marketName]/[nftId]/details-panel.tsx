import CollapsePanel from "@/app/_common/collapse-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { INFT } from "@/lib/api/use-market-nfts";
import { IMarket } from "@/lib/api/use-markets";
import { truncateAddr } from "@/lib/utils/web3";

export default function DetailsPanel({
  isPending,
  nft,
  marketInfo,
}: {
  isPending: boolean;
  nft: INFT | undefined;
  marketInfo: IMarket | undefined;
}) {
  return (
    <CollapsePanel className="mt-[15px]" panelName="Details">
      <div className="mt-[15px] mx-5 mb-5">
        <div className="flex justify-between space-x-[15px]">
          <DetailItemCard isPending={isPending} title="Contract Address">
            {truncateAddr(nft?.token_address, [4, 4])}
          </DetailItemCard>
          <DetailItemCard isPending={isPending} title="tokenId">
            {nft?.token_id}
          </DetailItemCard>
          <DetailItemCard isPending={isPending} title="TokenStandard">
            {nft?.token_standard}
          </DetailItemCard>
        </div>
        <div className="flex justify-between space-x-[15px] mt-[15px]">
          <DetailItemCard isPending={isPending} title="Blockchain">
            {marketInfo?.block_chain}
          </DetailItemCard>
          <DetailItemCard isPending={isPending} title="Total Supply">
            {nft?.total_supply}
          </DetailItemCard>
          <DetailItemCard isPending={isPending} title="Owner">
            {truncateAddr(nft?.owner, [4, 4])}
          </DetailItemCard>
        </div>
      </div>
    </CollapsePanel>
  );
}

function DetailItemCard({
  isPending,
  title,
  children,
}: {
  isPending: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1D0E27] w-[170px] p-5">
      <div className="text-white text-sm opacity-60">{title}</div>
      {isPending ? (
        <Skeleton className="h-4 mb-2 mt-5 w-[80px]" />
      ) : (
        <div className="text-white text-base font-medium mt-3">{children}</div>
      )}
    </div>
  );
}
