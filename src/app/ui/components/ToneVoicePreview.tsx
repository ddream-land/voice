"use client";
import React, { useCallback, useRef, useState } from "react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useWavesurfer } from "@wavesurfer/react";
import VoicePreview from "./VoicePreview";
import { Input } from "@nextui-org/react";

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

function ToneVoicePreview({ voiceSrc }: { voiceSrc: string }) {
  const [isPlay, setIsPlay] = useState(false);

  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 40,
    barWidth: 3,
    barRadius: 3,
    waveColor: "#eee",
    progressColor: "#0178FF",
    cursorColor: "OrangeRed",
    url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const duration = wavesurfer && wavesurfer.getDuration();

  return (
    <div className="self-stretch bg-zinc-600 rounded-xl justify-start items-center gap-4 inline-flex p-4">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch justify-start items-start gap-3 inline-flex">
          <VoicePreview voiceSrc={voiceSrc} hideTimeline={true} classNames={{playButton: 'h-10 w-10'}} />
        </div>
        <div className="self-stretch justify-between items-start gap-3 inline-flex">
          <div className="w-[120px] h-full pl-3.5 py-3.5 bg-zinc-800 rounded-xl shadow justify-start items-center flex">
            <div className="pr-2 flex-row justify-start items-start inline-flex">
              <div className="text-slate-100 text-lg font-semibold font-['Archivo'] leading-normal">
              😄
							</div>
							<div className="text-slate-100 text-base font-medium font-['Inter']">
								Happy
							</div>
            </div>
          </div>
					<Input classNames={{
						base: 'grow',
					}} type="text" variant="flat" color="default" placeholder="With Error Message" />
        </div>
      </div>
    </div>
  );
}

export default ToneVoicePreview;
