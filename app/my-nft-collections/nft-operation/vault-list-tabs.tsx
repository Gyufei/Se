import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { capitalize } from "lodash";

import VaultContent from "./vault-content";
import ListContent from "./list-content";
import { useSearchParams } from "next/navigation";
import { removeQueryParams } from "@/lib/utils/url";

const TabTriggerClx =
  "h-10 px-5 text-white data-[state=inactive]:bg-transparent transition-all rounded-none data-[state=active]:bg-[#382544] data-[state=active]:font-bold data-[state=inactive]:font-medium data-[state=inactive]:opacity-60";

const tabs = ["vault", "list"];
export default function VaultListTabs() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  useEffect(() => {
    if (action) {
      setCurrentTab(action);
    }
  }, [action]);

  function handleChangeTab(tab: string) {
    removeQueryParams(["action"]);
    setCurrentTab(tab);
  }

  return (
    <Tabs value={currentTab} className="mt-12" onValueChange={handleChangeTab}>
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
        <VaultContent />
      </TabsContent>
      <TabsContent
        value={tabs[1]}
        className="flex flex-1 flex-col data-[state=inactive]:hidden"
        forceMount={true}
      >
        <ListContent />
      </TabsContent>
    </Tabs>
  );
}
