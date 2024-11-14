import numeral from "numeral";

const valueTextClx = "text-white font-medium text-xl";
const labelTextClx =
  "text-sm text-white opacity-60 leading-[18px] mt-[5px] font-medium";

export default function CollectionPrice() {
  const price = 40;
  const totalVol = 768100;
  const items = 10000;
  const listedPercent = 0.03;
  const vaultedPercent = 0.97;

  return (
    <div className="mt-9 flex items-center space-x-[60px]">
      <div>
        <div className={valueTextClx}>{price} RAE</div>
        <div className={labelTextClx}>Price</div>
      </div>
      <div>
        <div className={valueTextClx}>
          {numeral(totalVol).format("0.[00]a").toUpperCase()} RAE
        </div>
        <div className={labelTextClx}>Total Volume</div>
      </div>
      <div>
        <div className={valueTextClx}>
          {numeral(items).format("0.[00]a").toUpperCase()}
        </div>
        <div className={labelTextClx}>Items</div>
      </div>
      <div>
        <div className={valueTextClx}>
          {numeral(listedPercent).format("0.[00]%")}
        </div>
        <div className={labelTextClx}>Listed</div>
      </div>
      <div>
        <div className={valueTextClx}>
          {numeral(vaultedPercent).format("0.[00]%")}
        </div>
        <div className={labelTextClx}>Vaulted</div>
      </div>
    </div>
  );
}
