import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DescContent from "./desc-content";
import BidContent from "./bid-content";
import { capitalize } from "lodash";

const TabTriggerClx =
  "h-10 px-5 text-white data-[state=inactive]:bg-transparent transition-all rounded-none data-[state=active]:bg-[#382544] data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60";

const tabs = ["details", "bids"];

export default function DetailTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const bidLength = 400;

  return (
    <Tabs value={currentTab} className="mt-12" onValueChange={setCurrentTab}>
      <TabsList className="w-full flex justify-start p-0 space-x-[10px] pb-1 border-b-[2px] rounded-none border-[#382544]">
        <TabsTrigger className={TabTriggerClx} value={tabs[0]}>
          {capitalize(tabs[0])}
        </TabsTrigger>
        <TabsTrigger className={TabTriggerClx} value={tabs[1]}>
          {capitalize(tabs[1])} {bidLength ? `(${bidLength})` : ""}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value={tabs[0]}
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      >
        <DescContent />
      </TabsContent>
      <TabsContent
        value={tabs[1]}
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      >
        <BidContent />
      </TabsContent>
    </Tabs>
  );
}
