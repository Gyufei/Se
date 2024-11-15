import ShouldConnectBtn from "@/app/_common/should-connect-btn";

export default function BagBuyBtn({ onClick }: { onClick: () => void }) {
  function handleBuy() {
    onClick();
  }

  return (
    <ShouldConnectBtn className="mt-5 w-full" onClick={handleBuy}>
      Pay
    </ShouldConnectBtn>
  );
}
