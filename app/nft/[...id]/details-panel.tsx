import CollapsePanel from "@/app/_common/collapse-panel";
import { truncateAddr } from "@/lib/utils/web3";

const detailsInfo = {
  contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
  tokenId: "1234",
  tokenStandard: "ERC721",
  blockChain: "Ethereum",
  totalSupply: "1000",
  owner: "0x1234567890abcdef1234567890abcdef12345678",
};

export default function DetailsPanel() {
  return (
    <CollapsePanel className="mt-[15px]" panelName="Details">
      <div className="mt-[15px] mx-5 mb-5">
        <div className="flex justify-between space-x-[15px]">
          <DetailItemCard title="Contract Address">
            {truncateAddr(detailsInfo.contractAddress, [4, 4])}
          </DetailItemCard>
          <DetailItemCard title="tokenId">{detailsInfo.tokenId}</DetailItemCard>
          <DetailItemCard title="TokenStandard">
            {detailsInfo.tokenStandard}
          </DetailItemCard>
        </div>
        <div className="flex justify-between space-x-[15px] mt-[15px]">
          <DetailItemCard title="Blockchain">
            {detailsInfo.blockChain}
          </DetailItemCard>
          <DetailItemCard title="Total Supply">
            {detailsInfo.totalSupply}
          </DetailItemCard>
          <DetailItemCard title="Owner">
            {truncateAddr(detailsInfo.owner, [4, 4])}
          </DetailItemCard>
        </div>
      </div>
    </CollapsePanel>
  );
}

function DetailItemCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1D0E27] w-[170px] p-5">
      <div className="text-white text-sm opacity-60">{title}</div>
      <div className="text-white text-base font-medium mt-3">{children}</div>
    </div>
  );
}
