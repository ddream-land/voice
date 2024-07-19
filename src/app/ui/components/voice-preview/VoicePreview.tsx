"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import PlayButton from "./PlayButton";
import { cn, Skeleton } from "@nextui-org/react";
import { usePlayBtnDispatch } from "./PlayButtonContextProvider";

function VoicePreview({
	voiceSrc,
	classNames = {
		playButton: ""
	},
	onTimeChange,
}: {
  voiceSrc: string
	classNames?: {
		playButton?: string
	},
	onTimeChange?: (res: { currentTime: number, duration: number| null }) => void
}) {
	const containerRef = useRef(null)
  const playBtnDispatch = usePlayBtnDispatch();

  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    height: 40,
		barWidth: 3,
		barRadius: 3,
		waveColor: "#eee",
		progressColor: "#18A8CC",
		cursorColor: "OrangeRed",
		dragToSeek: true,
    url: voiceSrc,
  })
	
	const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

	const duration = wavesurfer && wavesurfer.getDuration();

	const onChangePlay = (play:boolean) => {
		onPlayPause();
		if (play) {
			playBtnDispatch({
        type: "pause",
        payload: {
          audio: wavesurfer
        },
      })
		}
	}

	useEffect(()=>{
		onTimeChange && onTimeChange({ currentTime: currentTime, duration: duration })
	}, [currentTime, duration])

  return (
		<div className='h-full w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll'>
			<div className="shrink-0 h-full">
				{isReady ? (
					<div className="h-12 w-12 flex items-center justify-center">
						<PlayButton
							isPlay={isPlaying}
							onChange={onChangePlay}
							wavesurfer={wavesurfer}
							classNames={{
								base: classNames.playButton
							}}
						/>
					</div>
				): (
					<Skeleton className="w-12 h-12 rounded-lg"/>
				)}
			</div>
			<div className="w-full h-12 relative">
				<div ref={containerRef}  className="w-full py-1" />
				<div
					className={cn(
						isReady ? "hidden" : "flex",
						" absolute top-0 left-0 w-full h-full items-center justify-start"
					)}
				>
					<Skeleton className="w-full h-full rounded-lg"/>
				</div>
			</div>
		</div>
  );
}

export default VoicePreview;
