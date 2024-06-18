"use client";
import React, { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import NuwaChipRadioGroup from "../components/NuwaChipRadioGroup";

type TypeFilterItem = {
  label: string;
  value: string;
};


function VoiceListHeader() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("recent");
  const [selectedFilter, setSelectedFilter] = useState<TypeFilterItem | null>();
  const [filters, setFilters] = useState<Array<TypeFilterItem>>([{
    label: "Girl-12",
    value: "gril",
  }, {
    label: "Boy-23",
    value: "boy",
  }, {
    label: "Male-23",
    value: "male",
  }, {
    label: "Female-23",
    value: "female",
  }]);

  return (
    <div className="self-stretch justify-between items-center inline-flex bg-neutral-900 px-8 pt-10 w-full">
      <div className="h-[41px] justify-start items-center gap-6 flex">
        <div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">
          Voices
        </div>
        <div className="justify-start items-center gap-2.5 flex">
          <NuwaChipRadioGroup
            items={filters}
            value={selectedFilter}
            onChange={(e: any) => {
              if (e) {
                setSelectedFilter(e.target.value)
              } else {
                setSelectedFilter(null)
              }
            }}
          />
        </div>
      </div>

      <Tabs
        aria-label="Options"  
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        classNames={{
          panel: "p-0 w-full"
        }}
      >
        <Tab key="recent" title="Recent">
        </Tab>
        <Tab key="collection" title="Collection">
        </Tab>
      </Tabs>
    </div>
  );
}

export default VoiceListHeader;
