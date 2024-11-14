import ShouldConnectBtn from "@/components/share/should-connect-btn";

export default function ConfirmBuyBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-5">
      <ShouldConnectBtn className="w-full" onClick={onClick}>
        Buy
      </ShouldConnectBtn>
    </div>
  );
}
