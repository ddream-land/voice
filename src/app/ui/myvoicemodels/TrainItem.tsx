"use client";
import TrainIcon from "@/app/icons/TrainIcon";
import { BeakerIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, cn } from "@nextui-org/react";
import React, { useState } from "react";

function TrainItem({
  name,
  status,
  isSelected,
  onSelectedChange,
}: {
  name:string,
  status: 'completing' | 'completed' | 'failed'
  isSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
}) {
  return (
    <div className="w-full h-[76px] px-4 py-2.5 bg-zinc-800 rounded-2xl justify-between items-center inline-flex">
      <div className="justify-start items-center gap-2.5 flex">
        <div className="justify-start items-center gap-2.5 flex">
          <div className="justify-center items-center flex">
            <Checkbox isSelected={isSelected} onValueChange={onSelectedChange} size="sm" defaultSelected></Checkbox>
          </div>
          <div className="w-[200px] text-zinc-400 text-base font-semibold font-['Inter'] leading-normal">
            {name}
          </div>
        </div>
        <div className="px-0.5 rounded-xl justify-center items-center gap-1 flex">
          {status === 'completing' && (
            <TrainIcon className="w-5 h-5 fill-violet-500" />
          )}
          {status === 'completed' && (
            <CheckCircleIcon className="w-5 h-5 fill-green-500" />
          )}
          {status === 'failed' && (
            <XCircleIcon className="w-5 h-5 fill-rose-600" />
          )}
          <div className="px-0.5 justify-center items-center flex">
            <div className={cn([
              "text-sm font-normal font-['Inter'] leading-tight",
              status === 'completing' && 'text-violet-500',
              status === 'completed' && 'text-green-500',
              status === 'failed' && 'text-rose-600'
            ])}>
              {status === 'completing' && (
                <span>Training: completing in 10 mins...</span>
              )}
              {status === 'completed' && (
                <span>Completed</span>
              )}
              {status === 'failed' && (
                <span>Failed</span>
              )}
            </div>
          </div>
          
        </div>
      </div>
      {status !== 'completing' && (
        <div className="justify-start items-center gap-2 flex">
          <Button variant="light" className="text-zinc-400" startContent={<BeakerIcon className="w-5 h-5" />}>Run on WorkStation</Button>
          <Button variant="light" className="text-zinc-400">Download</Button>
          <Button variant="light" className="text-zinc-400">Publish</Button>
        </div>
      )}
    </div>
  );
}

export default TrainItem;
