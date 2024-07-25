"use client";
import React from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { Tab, Tabs } from "@nextui-org/react";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";

type TypeFilterItem = {
  label: string;
  value: string;
};

function VoiceListHeader({
  filters= {
    type: "",
    name: "",
  },
  onChange
}: {
  filters: VoiceModelFilterType,
  onChange: (newFilters: VoiceModelFilterType) => void
}) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="self-stretch justify-between items-center inline-flex bg-neutral-900 px-8 pt-10 w-full">
      <div className="h-[41px] justify-start items-center gap-6 flex">
        <div className="text-white text-xl font-semibold leading-normal">
          {t("WorkStation.voiceTitle")}
        </div>
      </div>

      <Tabs
        aria-label="Options"  
        selectedKey={filters.type}
        onSelectionChange={(key) => {
          onChange({
            ...filters,
            type: key as any
          })
        }}
        classNames={{
          panel: "p-0 w-full"
        }}
      >
        <Tab key="browse" title={t("WorkStation.filterRecent")}>
        </Tab>
        <Tab key="collection" title={t("WorkStation.filterCollection")}>
        </Tab>
      </Tabs>
    </div>
  );
}

export default VoiceListHeader;
