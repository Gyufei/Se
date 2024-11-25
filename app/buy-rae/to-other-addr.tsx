import { Checkbox } from "@/components/ui/checkbox";

export default function ToOtherAddr({
  toOther,
  setToOther,
  addr,
  setAddr,
}: {
  toOther: boolean;
  setToOther: (_v: boolean) => void;
  addr: string;
  setAddr: (v: string) => void;
}) {
  function handleToggleShowAddr(v: boolean) {
    if (!v) {
      setToOther(false);
      setAddr("");
    }

    setToOther(v);
  }

  return (
    <>
      <div className="flex mt-4 items-center space-x-2">
        <Checkbox
          checked={toOther}
          onCheckedChange={handleToggleShowAddr}
          id="toOtherAddr"
        />
        <label className="text-white opacity-80 text-sm" htmlFor="toOtherAddr">
          To another address
        </label>
      </div>

      {toOther && (
        <input
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="Recipient's Address"
          className="bg-[#281A31] px-5 py-[15px] h-12 text-white mt-[10px]"
        />
      )}
    </>
  );
}
