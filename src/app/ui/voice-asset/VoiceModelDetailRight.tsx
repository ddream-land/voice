"use client";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import { ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import React from "react";

function VoiceAssetDetailRight() {
  return (
    <div className="flex-col justify-start items-start gap-6 inline-flex">
      <div className="justify-start items-start gap-2 inline-flex">
        <Button size="lg" color="primary" variant="solid" className="w-[230px]" startContent={<DCubeIcon className="h-6 w-6 fill-white" />}>Run on WorkStation</Button>
        <Button size="lg" variant="bordered"  startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} />
        <Button size="lg" variant="bordered"  startContent={<ShareIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} />

      </div>
      <div className="self-stretch h-[396px] flex-col justify-start items-start flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
              Runnings
            </div>
            <div className="self-stretch text-white text-sm font-semibold font-['Inter'] leading-tight">
              200
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
              Downloads
            </div>
            <div className="self-stretch text-white text-sm font-semibold font-['Inter'] leading-tight">
              2000
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
              Sharing
            </div>
            <div className="self-stretch text-white text-sm font-semibold font-['Inter'] leading-tight">
              2000
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            By
          </div>
          <div className="self-stretch justify-center items-start gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
              fuhsi Voice Studio
            </div>
            <div className="grow shrink basis-0 text-white text-sm font-semibold font-['Inter'] leading-tight">
              Self-trained
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Time
          </div>
          <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
            21:30 March 25 2024
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Source
          </div>
          <div className="self-stretch justify-center items-start gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
              Reprint
            </div>
            <div className="grow shrink basis-0 text-white text-sm font-semibold font-['Inter'] leading-tight">
              From: http://23jdhsuh.com/hss
            </div>
          </div>
        </div>
        <div className="self-stretch h-[124px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Permissions
          </div>
          <div className="flex-col justify-center items-start gap-2 flex">
            <div className="w-full justify-start items-center gap-2 inline-flex">
              <CheckCircleIcon className="w-4 h-4 fill-green-500"/>
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                Reprint Allowed
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              <CheckCircleIcon className="w-4 h-4 fill-green-500"/>
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                Download Allowed
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              <CheckBadgeIcon className="w-4 h-4 fill-amber-500"/>
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                Commercial Use Allowed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceAssetDetailRight;
