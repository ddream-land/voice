"use client";
import React, { useCallback, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import VoicePreview from "./VoicePreview";
import { VoiceModelToneType } from "@/app/lib/definitions.voice";
import { toneListEn } from "@/app/lib/definitions.tone";

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

function ToneVoicePreview({
  tone
} : {
  tone: VoiceModelToneType
}) {
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex">
      <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-4 inline-flex">
        {tone.text && (
          <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
            <div className="self-stretch">
              {tone.text}
            </div>
          </div>
        )}
        
        <div className="self-stretch pl-3 pr-4 py-3 bg-neutral-900 rounded-xl justify-start items-start gap-6 inline-flex">
            <div className="w-28 h-12 px-4 py-2 bg-zinc-800 rounded-xl justify-start items-center gap-2 flex">
                <div className="justify-start items-center gap-2 flex">
                    {/* <div className="text-slate-100 text-lg font-semibold  leading-normal">😄</div> */}
                    <div className="text-white text-sm font-medium leading-tight">{toneListEn.find((item) => item.value === tone.tone_type)?.label}</div>
                </div>
            </div>
            <div className="grow shrink basis-0 self-stretch justify-start items-center gap-3 flex">
              <VoicePreview
                voiceSrc={tone.audio_url}
                classNames={{playButton: 'h-10 w-10'}}
                onTimeChange={res => {
                  setCurrentTime(res.currentTime);
                  setDuration(res.duration || 0);
                }}
              />
            </div>
            <div className="w-24 h-full flex flex-row items-center justify-end">
              <span className="text-zinc-200 text-sm font-normal leading-tight">{formatTime(currentTime)}</span>
              <span className="text-zinc-400 text-sm font-normal leading-tight">/ {formatTime(duration)}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ToneVoicePreview;
