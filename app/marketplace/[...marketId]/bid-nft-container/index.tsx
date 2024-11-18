import Image from "next/image";
import PathBreadcrumb from "./path-breadcrumb";
import DetailTabs from "./detail-tabs";

export default function DetailContainer() {
  return (
    <div className="mt-12 mb-10 flex-1 flex justify-center">
      <div className="w-[580px]">
        <PathBreadcrumb paths={["Lucky Market", "Cyptopunks No. 999"]} />
        <Image
          className="mt-5"
          src="/images/mock-nft.png"
          width={580}
          height={580}
          alt="nft"
        />
        <DetailTabs />
      </div>
    </div>
  );
}
