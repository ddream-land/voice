"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import VoiceHistoryList from "./VoiceHistoryList";
import { InfType, VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import { SparklesIcon } from "@heroicons/react/24/solid";

function VoiceHistory({
  sending,
  newInfList = [],
  infType = 'audio'
}: {
  sending: boolean
  newInfList: Array<VoiceInfHistoryType>
  infType: InfType
}) {
  const t = useTranslations();
  const [voiceList, setVoiceList] = useState<VoiceInfHistoryType[] | null>(null);

  const [vhInfType, setVhInfType] = useState<InfType>(infType);

  useEffect(() => {
    setVhInfType(infType)
  }, [newInfList])
  // inf_type
  return (
    <div className=" overflow-y-scroll h-auto w-[380px] self-stretch px-8 pt-8 rounded-br-[20px] flex-col justify-start items-start gap-5 inline-flex">
      <div className="fixed top-20 right-0 w-[380px] z-40">
        <div className="px-8 pt-8 bg-neutral-900">
          <div className="self-stretch justify-between items-center inline-flex w-full">
            <div className="text-white text-xl font-semibold  leading-normal">{t("WorkStation.voiceHistoryTitle")}</div>
          </div>
        </div>
      </div>
      
      <div className="self-stretch pt-[40px] h-[calc(100vh-40px)] overflow-hidden">
        {sending && (
          <div className="justify-start items-start gap-5 inline-flex mt-2">
            <SparklesIcon className="w-6 h-6 fill-violet-500" />
            <div className="text-gray-500 text-base font-normal  leading-normal">{t("WorkStation.voiceHistoryGenerating")}</div>
          </div>
        )}
        
			  <VoiceHistoryList key={vhInfType} type={vhInfType} newInfList={newInfList} onChange={(newVoiceList) => setVoiceList(newVoiceList)} />
      </div>
    </div>
  );
}

export default VoiceHistory;
