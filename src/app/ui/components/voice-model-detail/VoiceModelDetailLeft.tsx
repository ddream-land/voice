"use client";
import React from "react";
import Image from "next/image";
import { VoiceModelPublishType } from "@/app/lib/definitions.voice";
import GPTSovitsIcon from "@/app/icons/GPTSovitsIcon";
import ToneVoicePreview from "../voice-preview/ToneVoicePreview";
import { useTranslations } from "next-intl";

function VoiceAssetDetailLeft({
  voicePublishInfo, 
}: {
  voicePublishInfo: VoiceModelPublishType
}) {
  const t = useTranslations();
  
  return (
    <div className="w-full flex-col justify-start items-start gap-8 flex">
      <div className="justify-center items-start gap-2.5 flex flex-col">
        <div className="text-white text-4xl font-semibold leading-10 inline-flex">
          {voicePublishInfo.publish_info.name}
          <div className=" shrink-0 pl-1 pr-2 py-1 bg-black/opacity-30 rounded-[36px] backdrop-blur-[21px] justify-start items-center gap-1.5 flex">
            <div className="w-6 h-6 bg-blue-500 rounded-full justify-center items-center flex">
              <GPTSovitsIcon className="fill-white h-4 w-4" />
            </div>
            <div className="text-white text-sm font-normal leading-tight">
              GPT-Sovits
            </div>
          </div>
        </div>
        <div className="justify-start items-center gap-1 inline-flex">
          {voicePublishInfo.publish_info.tag.map((tag, index) => {
            return (
              <div key={index} className="px-2 py-0.5 bg-zinc-800 rounded justify-center items-center gap-2 flex">
                <div className="text-white text-xs font-semibold leading-tight">
                  {tag}
                </div>
              </div>
            )
          })}
        </div>
        </div>

      <div className="shrink-0 self-stretch justify-start items-start gap-6 flex flex-row">
        <div className="shrink-0 w-[200px] h-[200px] rounded-xl relative">
          <Image
            fill={true}
            alt={voicePublishInfo.publish_info.cover_url}
            className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
            src={voicePublishInfo.publish_info.cover_url}
          />
        </div>
        <div className=" grow text-white text-sm font-normal leading-tight text-wrap">
          {voicePublishInfo.publish_info.desc}
        </div>
      </div>

      <div className="self-stretch flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <div className="text-white text-xl font-semibold leading-7">
            {t("VoiceModelDetail.tonesPreview")}
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
          {voicePublishInfo.tone.map((toneItem, index) => (
            <ToneVoicePreview key={index} tone={toneItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoiceAssetDetailLeft;
