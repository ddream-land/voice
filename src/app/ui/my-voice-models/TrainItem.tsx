"use client";
import TrainIcon from "@/app/icons/TrainIcon";
import { voiceTrainRecordType } from "@/app/lib/definitions.voice";
import { BeakerIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, cn } from "@nextui-org/react";
import React, { useState } from "react";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import VoiceModelDownloadButton from "../components/voice-model-download-button/VoiceModelDownloadButton";
import { taskRetrain } from "@/app/lib/voice.api";
import FlashCircleIcon from "@/app/icons/FlashCircleIcon";
import { useTranslations } from "next-intl";


function TrainItem({
  value,
  isSelected = false,
  onValueChange,
  onRetrain,
}: {
  value: voiceTrainRecordType,
  isSelected?: boolean;
  onValueChange?: (selected: boolean) => void;
  onRetrain?: () => void;
}) {
  const t = useTranslations();
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [startGptDownload, setStartGptDownload] = useState(0);
  const [startSovitsDownload, setStartSovitsDownload] = useState(0);
  const [ retraining, setRetraining] = useState(false);



  const taskRetrainApi = taskRetrain();
  const taskRetrainServer = async () => {
    if (retraining) {
      return;
    }
    setRetraining(true);
    const res = await taskRetrainApi.send({
      task_id: value.task_id
    });
    if (res && res.code === 0) {
      onRetrain && onRetrain();
    }
    setRetraining(false);
  };

  const onTaskRetrainHandler = () => {
    taskRetrainServer();
  }

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
          {value.status === 3 && value.result === 2 && value.retrain && (
            <FlashCircleIcon className="w-5 h-5 fill-amber-500" />
          )}
          {value.status === 3 && value.result === 2 && !value.retrain && (
            <XCircleIcon className="w-5 h-5 fill-rose-600" />
          )}

          <div className="px-0.5 justify-center items-center flex">
            <div className={cn([
              "text-sm font-normal leading-tight",
              value.status === 1 && 'text-zinc-400',
              value.status === 2 && 'text-violet-500',
              (value.status === 3 && value.result === 1) && 'text-green-500',
              (value.status === 3 && value.result === 2 && value.retrain) && 'text-amber-500',
              (value.status === 3 && value.result === 2 && !value.retrain) && 'text-rose-600'
            ])}>
              {value.status === 1 && (
                <span>{t("MyVoiceModels.statusInQueue")}</span>
              )}
              {value.status === 2 && (
                <span>{t("MyVoiceModels.statusTraining")}</span>
              )}
              {(value.status === 3 && value.result === 1) && (
                <span>{t("MyVoiceModels.statusCompleted")}</span>
              )}
              {(value.status === 3 && value.result === 2 && value.retrain) && (
                <span>{t("MyVoiceModels.statusRetryFailed")}</span>
              )}
              {(value.status === 3 && value.result === 2 && !value.retrain) && (
                <span>{t("MyVoiceModels.statusFailed")}</span>
              )}
            </div>
          </div>
          
        </div>
      </div>
      <div className="justify-start items-center gap-2 flex">
        {(value.status === 3 && value.result === 1) && (
          <>
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
            <Button variant="light" className="text-zinc-400" onPress={() => {setStartGptDownload(startGptDownload + 1)}}>{t("Button.downloadCKPTFile")}</Button>
            <Button variant="light" className="text-zinc-400" onPress={() => {setStartSovitsDownload(startSovitsDownload + 1)}}>{t("Button.downloadPTHFile")}</Button>
            <Button variant="light" className="text-zinc-400" onPress={() => {setSelectModalOpen(true)}}>{t("Button.publish")}</Button>
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
        <>
        {(value.result === 2 && !value.retrain) && (
          <Button variant="light" className="text-zinc-400" onPress={() => {onTaskRetrainHandler()}}>{t("Button.retry")}</Button>
        )}
        </>
      </div>
    </div>
  );
}

export default TrainItem;
