"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import VoiceHistoryControl from "./VoiceHistoryControl";
import VoiceHistoryList from "./VoiceHistoryList";

function VoiceHistory() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("Voices");

  return (
    <div className=" overflow-y-scroll h-auto w-[380px] self-stretch p-8 rounded-br-[20px] flex-col justify-start items-start gap-5 inline-flex">
      <div className="fixed top-14 right-0 w-[380px] z-40">
        <VoiceHistoryControl />
      </div>
			
      <div className="self-stretch pt-[118px] overflow-hidden">
			  <VoiceHistoryList />
      </div>
    </div>
  );
}

export default VoiceHistory;
