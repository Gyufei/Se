import ShouldConnectBtn from "@/app/_common/should-connect-btn";

export default function ClaimNFT() {
  function handleClaim() {}

  return (
    <ShouldConnectBtn className="mt-5 w-full" onClick={handleClaim}>
      Claim your NFT
    </ShouldConnectBtn>
  );
}
