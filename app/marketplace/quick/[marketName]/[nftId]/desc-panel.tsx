import CollapsePanel from "@/app/_common/collapse-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { IMarket } from "@/lib/api/use-markets";

export default function DescPanel({
  isPending,
  marketInfo,
}: {
  isPending: boolean;
  marketInfo: IMarket | undefined;
}) {
  return (
    <CollapsePanel className="mt-[15px] mb-[80px]" panelName="Details">
      {isPending ? (
        <>
          <Skeleton className="m-5 h-4 mb-2 mt-5 w-[300px]" />
          <Skeleton className="m-5 h-4 mb-5 mt-2 w-[200px]" />
        </>
      ) : (
        <div className="m-5 text-white opacity-80 text-sm">
          {marketInfo?.description}
        </div>
      )}
    </CollapsePanel>
  );
}
