"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, cn, Tooltip } from "@nextui-org/react";
import PlayButton from "../voice-preview/PlayButton";
import DownloadIcon from "@/app/icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";
import GPTSovitsIcon from "@/app/icons/GPTSovitsIcon";
import { VoiceModelType } from "@/app/lib/definitions.voice";
import { getStarNumStr } from "@/app/lib/utils";
import CommercialLicenseIcon from "./CommercialLicenseIcon";
import VoiceModelCollectButton from "./VoiceModelCollectButton";

function VoiceModelItem({
  voice,
  isSelected = false,
  type,
  onItemClick
}: {
  voice: any,
  isSelected: boolean,
  type: 'workstation' | 'my' | 'all';
  onItemClick?: (voiceModel: VoiceModelType) => void;
}) {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div className="group/item" key={voice.id}>
      <div
        className={cn(
          isSelected
            ? 'border-primary'
            : 'group-hover/item:border-primary border-transparent',
          " cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-2 flex-col justify-start items-start inline-flext"
        )}
      >
        <div className="relative">
          <div className="w-full pb-[44%] rounded-xl relative">
            <Image
              fill={true}
              alt={voice.publish_info.cover_url}
              className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
              src={voice.publish_info.cover_url}
              onClick={() => {
                onItemClick && onItemClick(voice);
              }}
            />
          </div>
          <div className="justify-start items-center gap-1 inline-flex absolute top-4 left-3">
            {type !== 'workstation' && (
              <>
                <GPTSovitsIcon className="w-5 h-5 fill-blue-500" />
                <div className="text-white text-xs font-normal leading-none">GPT-Sovits</div>
              </>
            )}
            {voice.publish_info.permission.commercial_license && type === 'workstation' && (
              <>
                <CommercialLicenseIcon />
                <div
                  className="text-white text-xs font-normal leading-none"
                  onClick={() => {
                    onItemClick && onItemClick(voice);
                  }}
                >Commercial</div>
              </>
            )}
          </div>

          <div className="justify-start items-center gap-1 inline-flex absolute top-4 right-3">
            {type === 'workstation' && (
              <VoiceModelCollectButton like={voice.like} publishId={voice.publish_id} />
            )}
          </div>

          <div className="absolute right-4 -bottom-4" 
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
            <PlayButton
              isPlay={isPlay}
              voiceSrc={voice.tone[0].audio_url}
              onChange={(play: boolean) => {
                setIsPlay(play);
              }}
            />
          </div>
        </div>
        
        <div
          className="w-full px-4 py-3 flex-col justify-start items-start gap-2 inline-flex"
          onClick={() => {
            onItemClick && onItemClick(voice);
          }}
        >
          <div className="h-7 w-full overflow-hidden justify-start items-center inline-flex pr-10">
            <div className="text-white text-lg font-semibold leading-7 truncate">
              {voice.publish_info.name}
            </div>
            {voice.publish_info.permission.commercial_license && type !== 'workstation' && (
              <CommercialLicenseIcon />
            )}
          </div>
          <div className="self-stretch justify-between items-center inline-flex gap-2">
            <div className="justify-center items-center gap-1.5 flex overflow-hidden">
              <Avatar className="shrink-0" name={voice?.publisher?.name} src={voice?.publisher?.avatar} size="sm" />
              <div className="text-zinc-400 text-xs font-normal leading-none truncate">
                {voice?.publisher?.name}
              </div>
            </div>

            <div className="justify-end items-center gap-2 flex">
              {type !== 'workstation' && (
                <>
                  <div className="justify-end items-center gap-0.5 flex">
                    <StarIcon className={`w-4 h-4 ${voice.star ? 'fill-amber-500' : 'fill-zinc-400'}`} />
                    <div className="text-white text-xs font-normal leading-none">
                      {getStarNumStr(voice.star_num)}
                    </div>
                  </div>
                  <div className="justify-end items-center gap-0.5 flex">
                    <DownloadIcon className="w-4 h-4" />
                    <div className="text-white text-xs font-normal leading-none">
                      {getStarNumStr(voice.d_num)}
                    </div>
                  </div>
                </>
              )}
              
              <div className="justify-start items-center gap-0.5 flex">
                {type !== 'workstation' && (
                  <BeakerIcon className="w-4 h-4 relative" />
                )}
                {type === 'workstation' && (
                  <div className="text-zinc-400 text-xs font-normal leading-none">Run</div>
                )}
                <div className="text-white text-xs font-normal leading-none">
                  {getStarNumStr(voice.inf_num)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceModelItem;
