"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import MainStation from "./MainStation";
import VoiceHistory from "../components/voice-inf-history/VoiceHistory";
import { InfType, VoiceInfHistoryType } from "@/app/lib/definitions.voice";

function WorkStation() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  const [voiceHistoryKey, setVoiceHistoryKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [infType, setInfType] = useState<InfType>('audio')
  const [newInfList, setNewInfList] = useState<Array<VoiceInfHistoryType>>([])

  return (
    <div className="w-full h-screen pt-20 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <MainStation
          onInfSuccess={(newInf) => {
            // setVoiceHistoryKey((prev) => prev + 1)
            if (newInfList.length > 0 && newInfList[0].inf_type !== newInf.inf_type) {
              setNewInfList([
                newInf
              ])
            } else {
              setNewInfList([
                newInf,
                ...newInfList
              ])
            }
          }}
          onSendingChange={({sending, infType}) => {
            setSending(sending)
            // setInfType(infType)
          }}
        />
        <VoiceHistory key={voiceHistoryKey} sending={sending} infType={infType} newInfList={newInfList}/>
      </div>
  </div>
  );
}

export default WorkStation;
