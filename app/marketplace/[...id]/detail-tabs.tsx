import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DescContent from "./desc-content";

const TabTriggerClx =
  "h-10 px-5 text-white data-[state=inactive]:bg-transparent rounded-none data-[state=active]:bg-[#382544] data-[state=inactive]:opacity-60";

export default function DetailTabs() {
  const [currentTab, setCurrentTab] = useState("details");

  const bidLength = 400;

  return (
    <Tabs value={currentTab} className="mt-12" onValueChange={setCurrentTab}>
      <TabsList className="w-full flex justify-start p-0 space-x-[10px] pb-1 border-b-[2px] rounded-none border-[#382544]">
        <TabsTrigger className={TabTriggerClx} value="details">
          Details
        </TabsTrigger>
        <TabsTrigger className={TabTriggerClx} value="bids">
          Bids {bidLength ? `(${bidLength})` : ""}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="details"
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      >
        <DescContent />
      </TabsContent>
      <TabsContent
        value="bids"
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      ></TabsContent>
    </Tabs>
  );
}
