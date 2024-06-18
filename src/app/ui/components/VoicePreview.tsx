"use client";
import React, { useCallback, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import PlayButton from "./PlayButton";


const formatTime = (seconds: any) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

function VoicePreview({
	voiceSrc,
	hideTimeline = true,
	classNames = {
		voicePreview: "",
		playButton: ""
	},
}: {
  voiceSrc: string
	hideTimeline: boolean,
	classNames?: {
		voicePreview?: string,
		playButton?: string
	}
}) {

  const [isPlay, setIsPlay] = useState(false);


	const containerRef = useRef(null)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 40,
		barWidth: 3,
		barRadius: 3,
		waveColor: "#eee",
		progressColor: "#0178FF",
		cursorColor: "OrangeRed",
		dragToSeek: true,
    url: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
  })
	
	const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

	const duration = wavesurfer && wavesurfer.getDuration();

	const onChangePlay = (play:boolean) => {
		onPlayPause();
		setIsPlay(play);
	}

  return (
		<div className="self-stretch h-full w-full flex-col justify-start items-start gap-2 flex overflow-hidden">
			<div className={[classNames.voicePreview, hideTimeline ? 'h-10' : 'h-16 p-4', 'w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll'].join(' ')}>
					<div className={`shrink-0 `}>
						<PlayButton isPlay={isPlaying} onChange={onChangePlay} classNames={{
							base: classNames.playButton
						}} />
					</div>
					<div className="w-full">
						<div ref={containerRef}  className="w-full" />
					</div>
			</div>
			{!hideTimeline && (
				<div className="self-stretch justify-between items-center inline-flex">
					<div className="text-gray-500 text-xs font-medium font-['Inter']">{formatTime(currentTime)}</div>
					<div className="text-gray-500 text-xs font-medium font-['Inter']">{formatTime(duration)}</div>
				</div>
			)}
			
		</div>
  );
}

export default VoicePreview;
