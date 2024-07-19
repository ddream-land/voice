"use client";
import React, { useState } from "react";
import VoicePreview from "../voice-preview/VoicePreview";

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

function VoiceHistoryItemVoiceRreview({voiceSrc}: {
  voiceSrc: string
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <div className="p-2.5 w-full bg-neutral-900 rounded-xl h-[68px]">
        <VoicePreview
          voiceSrc={voiceSrc}
          classNames={{
            playButton: "w-8 h-8"
          }}
          onTimeChange={res => {
            setCurrentTime(res.currentTime);
            setDuration(res.duration || 0);
          }}
        />
      </div>
		  
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-gray-500 text-xs font-medium ">{formatTime(currentTime)}</div>
        <div className="text-gray-500 text-xs font-medium ">{formatTime(duration)}</div>
      </div>
    </div>
  );
}

export default VoiceHistoryItemVoiceRreview;
