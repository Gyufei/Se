import ShouldConnectBtn from "@/app/_common/should-connect-btn";

export default function VaultBtn() {
  function handleConfirm() {}

  return (
    <ShouldConnectBtn className="mt-5 w-full" onClick={handleConfirm}>
      Vault onto Lucky Market
    </ShouldConnectBtn>
  );
}
