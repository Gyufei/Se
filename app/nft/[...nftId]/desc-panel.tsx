import CollapsePanel from "@/app/_common/collapse-panel";

const descInfo = {
  desc: "Tesseara Maker is a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by street style tribes.",
};

export default function DescPanel() {
  return (
    <CollapsePanel className="mt-[15px] mb-[80px]" panelName="Details">
      <div className="m-5 text-white opacity-80 text-sm">{descInfo.desc}</div>
    </CollapsePanel>
  );
}
