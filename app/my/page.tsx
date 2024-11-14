import ListDisplay from "./list-display";
import NftOperation from "./nft-operation";

export default function MyPage() {
  return (
    <div className="flex">
      <ListDisplay />
      <NftOperation />
    </div>
  );
}
