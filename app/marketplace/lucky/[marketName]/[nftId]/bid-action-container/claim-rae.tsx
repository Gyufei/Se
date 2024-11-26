import ShouldConnectBtn from "@/app/_common/should-connect-btn";

const claimValue = 100;

export default function ClaimRae() {
  function handleClaim() {}

  return (
    <ShouldConnectBtn className="mt-5 w-full" onClick={handleClaim}>
      Claim {claimValue} RAE
    </ShouldConnectBtn>
  );
}
