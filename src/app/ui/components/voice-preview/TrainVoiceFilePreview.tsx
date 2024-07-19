"use client";
import React from "react";
import VoicePreview from "./VoicePreview";
import { TrashIcon } from "@heroicons/react/24/outline";


function TrainVoiceFilePreview({
  voiceSrc,
  onTrashClick,
}: {
  voiceSrc: string
  onTrashClick?: () => void
}) {

  return (
    <div className="w-full h-[88px] p-4 bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch p-3 bg-neutral-900 rounded-xl justify-start items-center gap-6 inline-flex">
          <VoicePreview voiceSrc={voiceSrc} classNames={{playButton: 'h-10 w-10'}} />
        </div>
      </div>
      <div className="flex items-center h-full cursor-pointer flex-col gap-4 justify-center">
        <TrashIcon className="w-5 h-5 fill-zinc-500"  onClick={onTrashClick}/>
      </div>
    </div>
  );
}

export default TrainVoiceFilePreview;
