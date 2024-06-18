"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import MainStationControl from "./MainStationControl";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";

type TypeFilterItem = {
  label: string;
  value: string;
};


function MainStation() {
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
    <div className="grow shrink basis-0 self-stretch rounded-bl-[20px] border-r border-neutral-800 flex-col justify-between items-center inline-flex">
      <div className="fixed top-14 left-0 pr-[382px] w-full z-40">
        <VoiceModelListHeader />
      </div>
      <div className="self-stretch pt-[88px] pb-[248px] overflow-hidden">
        <VoiceModelList />
      </div>

      <div className="fixed bottom-0 left-0 pr-[382px] w-full">
        <MainStationControl />
      </div>
      
    </div>
  );
}

export default MainStation;
