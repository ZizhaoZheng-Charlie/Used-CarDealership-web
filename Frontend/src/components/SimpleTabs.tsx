import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface SimpleTabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export function SimpleTabs({ items, defaultTab, className }: SimpleTabsProps) {
  const [activeTab, setActiveTab] = React.useState(
    defaultTab || items[0]?.id || ""
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={className}>
      <TabsList className="w-full justify-start mb-4">
        {items.map((item) => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
