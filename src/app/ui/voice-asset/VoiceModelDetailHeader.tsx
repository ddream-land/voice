"use client";
import GPTSovitsIcon from "@/app/icons/GPTSovitsIcon";
import { EllipsisHorizontalIcon, StarIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import React from "react";

function VoiceAssetDetailHeader() {
  return (
    <div className="w-full h-[82px] flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch justify-between items-end inline-flex">
        <div className="justify-center items-center gap-2.5 flex">
          <div className="text-white text-4xl font-semibold font-['Inter'] leading-10">
            Male Neo Soul
          </div>
          <div className="pl-1 pr-2 py-1 bg-black/opacity-30 rounded-[36px] backdrop-blur-[21px] justify-start items-center gap-1.5 flex">
            <div className="w-6 h-6 bg-blue-500 rounded-full justify-center items-center flex">
							<GPTSovitsIcon className="fill-white h-4 w-4" />
						</div>
            <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
              GPT-Sovits
            </div>
          </div>
        </div>
        <div className="w-[191px] self-stretch justify-start items-center gap-2 flex">
					<Button size="lg" variant="flat"  startContent={<StarIcon className="fill-amber-500 w-6 h-6" />}>Star 380</Button>
					<Button size="lg" variant="bordered"  startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} />
        </div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        <div className="px-2 py-0.5 bg-zinc-800 rounded justify-center items-center gap-2 flex">
          <div className="text-white text-xs font-semibold font-['Inter'] leading-tight">
            Girl
          </div>
        </div>
        <div className="px-2 py-0.5 bg-zinc-800 rounded justify-center items-center gap-2 flex">
          <div className="text-white text-xs font-semibold font-['Inter'] leading-tight">
            Sexy
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceAssetDetailHeader;
