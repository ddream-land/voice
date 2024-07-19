"use client";
import TrainIcon from "@/app/icons/TrainIcon";
import { voiceTrainRecordType } from "@/app/lib/definitions.voice";
import { BeakerIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, cn } from "@nextui-org/react";
import React, { useState } from "react";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import VoiceModelDownloadButton from "../components/voice-model-download-button/VoiceModelDownloadButton";


function TrainItem({
  value,
  isSelected = false,
  onValueChange,
}: {
  value: voiceTrainRecordType,
  isSelected?: boolean;
  onValueChange?: (selected: boolean) => void;
}) {
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [startGptDownload, setStartGptDownload] = useState(0);
  const [startSovitsDownload, setStartSovitsDownload] = useState(0);
  const [startDownload, setStartDownload] = useState(0);

  return (
    <div className="w-full h-[76px] px-4 py-2.5 bg-zinc-800 rounded-2xl justify-between items-center inline-flex">
      <div className="justify-start items-center gap-2.5 flex">
        <div className="justify-start items-center gap-2.5 flex">
          <div className="justify-center items-center flex">
            <Checkbox isSelected={isSelected} onValueChange={onValueChange} size="sm" defaultSelected></Checkbox>
          </div>
          <div className="w-[200px] text-zinc-400 text-base font-semibold leading-normal">
            {value.task_name}
          </div>
        </div>
        <div className="px-0.5 rounded-xl justify-center items-center gap-1 flex">
          {value.status === 1 && (
            <ClockIcon className="w-5 h-5 fill-zinc-400" />
          )}
          {value.status === 2 && (
            <TrainIcon className="w-5 h-5 fill-violet-500" />
          )}
          {value.status === 3 && value.result === 1 && (
            <CheckCircleIcon className="w-5 h-5 fill-green-500" />
          )}
          {value.status === 3 && value.result === 2 && (
            <XCircleIcon className="w-5 h-5 fill-rose-600" />
          )}
          <div className="px-0.5 justify-center items-center flex">
            <div className={cn([
              "text-sm font-normal leading-tight",
              value.status === 1 && 'text-zinc-400',
              value.status === 2 && 'text-violet-500',
              (value.status === 3 && value.result === 1) && 'text-green-500',
              (value.status === 3 && value.result === 2) && 'text-rose-600'
            ])}>
              {value.status === 1 && (
                <span>In Queue...</span>
              )}
              {value.status === 2 && (
                <span>Training: completing in 20 mins...</span>
              )}
              {(value.status === 3 && value.result === 1) && (
                <span>Completed</span>
              )}
              {(value.status === 3 && value.result === 2) && (
                <span>Failed</span>
              )}
            </div>
          </div>
          
        </div>
      </div>
      {(value.status === 3 && value.result === 1) && (
        <>
          <div className="justify-start items-center gap-2 flex">
            {/* <Button variant="light" className="text-zinc-400" startContent={<BeakerIcon className="w-5 h-5" />} onPress={() => {setIsOpen(true)}}>Run on WorkStation</Button> */}
            <VoiceModelDownloadButton
              modelId={value.task_param.model_id}
              type="gpt"
              startDownload={startGptDownload}
              onDownloading={() => {}}
              />
            <VoiceModelDownloadButton
              modelId={value.task_param.model_id}
              type="sovits"
              startDownload={startSovitsDownload}
              onDownloading={() => {}}
            />
            <Button variant="light" className="text-zinc-400" onPress={() => {setStartGptDownload(startGptDownload + 1)}}>Download CKPT File</Button>
            <Button variant="light" className="text-zinc-400" onPress={() => {setStartSovitsDownload(startSovitsDownload + 1)}}>Download PTH File</Button>
            <Button variant="light" className="text-zinc-400" onPress={() => {setSelectModalOpen(true)}}>Publish</Button>
          </div>
          <PublishVoiceModelModal
            key={'selectModalOpen'+ selectModalOpen.toString()}
            variant="SELECT"
            modelId={value.task_param.model_id}
            isOpen={selectModalOpen}
            onChange={(isOpen) => {setSelectModalOpen(isOpen)}}
            onSuccess={() => {
              setSelectModalOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}

export default TrainItem;
