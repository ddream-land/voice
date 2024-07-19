"use client";
import GPTSovitsIcon from "@/app/icons/GPTSovitsIcon";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import React from "react";
import { VoiceModelPublishType } from "@/app/lib/definitions.voice";
import VoiceModelCollectButton from "./VoiceModelCollectButton";

function VoiceAssetDetailHeader({
  voicePublishInfo, 
}: {
  voicePublishInfo: VoiceModelPublishType
}) {
  return (
    <div className="w-full h-[82px] flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch justify-between items-end inline-flex">
        <div className="justify-center items-center gap-2.5 flex">
          <div className="text-white text-4xl font-semibold leading-10">
            {voicePublishInfo.publish_info.name}
          </div>
          <div className="pl-1 pr-2 py-1 bg-black/opacity-30 rounded-[36px] backdrop-blur-[21px] justify-start items-center gap-1.5 flex">
            <div className="w-6 h-6 bg-blue-500 rounded-full justify-center items-center flex">
							<GPTSovitsIcon className="fill-white h-4 w-4" />
						</div>
            <div className="text-white text-sm font-normal leading-tight">
              GPT-Sovits
            </div>
          </div>
        </div>
        <div className="w-[360px] shrink-0 self-stretch justify-end items-center gap-2 flex">
          <VoiceModelCollectButton like={voicePublishInfo.like} publishId={voicePublishInfo.publish_id} starNum={voicePublishInfo.star_num} />
					{/* <Button size="lg" variant="bordered"  startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} /> */}
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
  );
}

export default VoiceAssetDetailHeader;
