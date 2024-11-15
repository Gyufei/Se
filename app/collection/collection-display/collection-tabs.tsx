"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { capitalize } from "lodash";
import ItemsContent from "./items-content";
import ActivitiesContent from "./activities-content";

const TabTriggerClx =
  "h-10 px-5 text-white data-[state=inactive]:bg-transparent transition-all rounded-none data-[state=active]:bg-[#382544] data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60";

const tabs = ["items", "activities"];
export default function VaultListTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <Tabs value={currentTab} className="mt-10" onValueChange={setCurrentTab}>
      <TabsList className="w-full flex justify-start p-0 space-x-3 pb-1 border-b-[2px] rounded-none border-[#382544]">
        <TabsTrigger className={TabTriggerClx} value={tabs[0]}>
          {capitalize(tabs[0])}
        </TabsTrigger>
        <TabsTrigger className={TabTriggerClx} value={tabs[1]}>
          {capitalize(tabs[1])}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value={tabs[0]}
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      >
        <ItemsContent />
      </TabsContent>
      <TabsContent
        value={tabs[1]}
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      >
        <ActivitiesContent />
      </TabsContent>
    </Tabs>
  );
}
