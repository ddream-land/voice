"use client";
import React, { useState } from "react";
import VoicePreview from "./VoicePreview";
import { Checkbox, cn, Input, Select, SelectItem } from "@nextui-org/react";
import { toneListEn, toneListZhCN } from "@/app/lib/definitions.tone";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

function ToneVoiceFile({
  voiceSrc,
  toneType,
  text,
  onTextChange,
  onToneTypeChange,
  hideTrash=true,
  onTrashClick,
  hideCheckbox=true,
  onSelectionChange,
  isDisabled=false,
  selected=false,
}: {
  voiceSrc: string
  toneType?: string
  text?: string
  onTextChange?: (newText: string) => void
  onToneTypeChange?: (newToneType: string) => void
  hideTrash?: boolean
  onTrashClick?: () => void
  hideCheckbox?: boolean
  onSelectionChange?: (selected: boolean) => void
  isDisabled?: boolean
  selected?: boolean
}) {
  const t = useTranslations();
  const locale = useLocale();
  const toneList = locale === "zh-CN" ? toneListZhCN : toneListEn;
  const [isSelected, setIsSelected] = useState(selected);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className={cn([isDisabled ? "opacity-30": "", isSelected ? "border-2  border-blue-600 p-[14px]" : "p-4", "relative self-stretch bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex"])}>
      {isDisabled && (<div className="w-full h-full absolute top-0 left-0 z-10" />)}
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch h-[72px] pl-3 pr-4 py-3 bg-neutral-900 rounded-xl justify-start items-start gap-6 flex flex-row">
          <div className="w-[180px] h-full">
            <Select
              disallowEmptySelection={true}
              variant="flat"
              size="lg"
              placeholder={t("PublishVoiceModel.toneVoiceFileLabel")}
              selectedKeys={[toneType as string]}
              classNames={{
                // trigger: 'bg-zinc-700'
              }}
              onChange={(e) => {
                onToneTypeChange && onToneTypeChange(e.target.value)
              }}
            >
              {toneList.map((tone) => (
                <SelectItem
                  key={tone.value}
                  value={tone.value}
                  classNames={{
                    base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
                  }}
                >
                  {tone.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grow shrink flex justify-start items-center h-full">
            <VoicePreview
              voiceSrc={voiceSrc}
              classNames={{playButton: 'h-10 w-10'}}
              onTimeChange={res => {
                setCurrentTime(res.currentTime);
                setDuration(res.duration || 0);
              }}
            />
          </div>
          <div className="w-24 h-full flex flex-row items-center justify-end">
            <span className="text-zinc-200 text-sm font-normal leading-tight">{formatTime(currentTime)}</span>
            <span className="text-zinc-400 text-sm font-normal leading-tight">/ {formatTime(duration)}</span>
          </div>
        </div>
        <div className="self-stretch justify-between items-start gap-3 inline-flex">
					<Input
            classNames={{
              base: 'grow',
              // inputWrapper: 'bg-zinc-700'
            }}
            size="lg"
            type="text"
            variant="bordered"
            color="default"
            placeholder={t("PublishVoiceModel.toneVoiceFileToneText")}
            value={text}
            onChange={(e) => {
              onTextChange && onTextChange(e.target.value)
            }}
          />
        </div>
      </div>
      {(!hideTrash || !hideCheckbox) && (
        <div className="flex items-center h-full cursor-pointer flex-col gap-4 justify-center">
          {!hideTrash && (<TrashIcon className="w-5 h-5 fill-zinc-500"  onClick={onTrashClick}/>)}
          {!hideCheckbox && (
            <Checkbox
              isDisabled={isDisabled}
              size="sm"
              className="w-5 h-5 fill-zinc-500"
              aria-label='checked'
              classNames={{
                base: "p-0",
                icon: "m-0",
                wrapper: "m-0",
                label: "m-0"
              }}
              isSelected={isSelected}
              onValueChange={(selected) => {
                setIsSelected(selected)
                onSelectionChange && onSelectionChange(selected)
              }}
            ></Checkbox>
          )}
        </div>
      )}
    </div>
  );
}

export default ToneVoiceFile;
