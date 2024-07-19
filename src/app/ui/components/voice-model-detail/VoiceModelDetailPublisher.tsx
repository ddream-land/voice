"use client";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { VoiceModelPublisher, VoiceModelPublishType } from "@/app/lib/definitions.voice";
import { getStarNumStr } from "@/app/lib/utils";
import moment from 'moment';
import { StarIcon } from "@heroicons/react/24/solid";
import DownloadIcon from "@/app/icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";

function VoiceModelDetailPublisher({
  publisher, 
}: {
  publisher: VoiceModelPublisher
}) {

  return (

    <div className="w-full px-4 py-3 bg-zinc-800 rounded-xl border border-zinc-700 justify-start items-start gap-4 inline-flex">
      <div className="justify-start items-start flex">
        <Avatar name={publisher.UserPO.name} size="md" src={publisher.UserPO.avatar} />
      </div>
      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex divide-y">
        <div className="flex-col justify-start items-start gap-0.5 flex pb-2 w-full">
          <div className="text-white text-base font-medium leading-normal">{publisher.UserPO.name}</div>
          <div className="text-zinc-400 text-xs font-normal leading-none">Joined {moment(publisher.UserPO.created_at).format('MMMM DD YYYY')}</div>
        </div>
        <div className="justify-start items-center gap-2.5 inline-flex pt-2 w-full">
          <div className="h-4 justify-start items-center gap-1 flex w-1/3">
              <StarIcon className="w-4 h-4 fill-zinc-400" />
              <div className="text-white text-xs font-normal leading-none">{getStarNumStr(publisher.UserBusiPO.starts)}</div>
          </div>
          <div className="h-4 justify-start items-center gap-1 flex w-1/3">
            <div className="w-4 h-4 justify-center items-center flex">
              <DownloadIcon className="w-4 h-4 relative" />
            </div>
            <div className="text-white text-xs font-normal leading-none">{getStarNumStr(publisher.UserBusiPO.down_load)}</div>
          </div>
            <div className="h-4 justify-start items-center gap-1 flex w-1/3">
              <BeakerIcon className="w-4 h-4 relative" />
              <div className="text-white text-xs font-normal leading-none">{getStarNumStr(publisher.UserBusiPO.run)}</div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default VoiceModelDetailPublisher;
