"use client";
import React from "react";
import VoicePreview from "../components/VoicePreview";



function VoiceHistoryItemVoiceRreview({voiceSrc}: {
  voiceSrc: string
}) {

  return (
    <div className="w-full">
		  <VoicePreview voiceSrc={voiceSrc} hideTimeline={false} classNames={{
        voicePreview: "bg-neutral-900",
        playButton: "w-8 h-8"
      }} />
    </div>
  );
}

export default VoiceHistoryItemVoiceRreview;
