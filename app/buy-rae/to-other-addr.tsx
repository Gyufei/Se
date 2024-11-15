import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function ToOtherAddr({
  addr,
  setAddr,
}: {
  addr: string;
  setAddr: (v: string) => void;
}) {
  const [showAddrInput, setShowAddrInput] = useState(false);

  function handleToggleShowAddr(v: boolean) {
    if (!v) {
      setShowAddrInput(false);
      setAddr("");
    }

    setShowAddrInput(v);
  }

  return (
    <>
      <div className="flex mt-4 items-center space-x-2">
        <Checkbox
          checked={showAddrInput}
          onCheckedChange={handleToggleShowAddr}
          id="toOtherAddr"
        />
        <label className="text-white opacity-80 text-sm" htmlFor="toOtherAddr">
          To another address
        </label>
      </div>

      {showAddrInput && (
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
