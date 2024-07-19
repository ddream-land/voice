"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { toneListEn } from "@/app/lib/definitions.tone";
import { UserIcon } from "@heroicons/react/24/outline";
import MainStationControlParameters from "./MainStationControlParameters";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { DefaultVoiceModelAdvancedParams, DefaultVoiceModelBasicParams, InfType, InstantGenerateParamsterType, VoiceInfHistoryType, VoiceModelToneType } from "@/app/lib/definitions.voice";
import MainStationInfButton from "./MainStationInfButton";
import { handleConfetti } from "@/app/lib/utils";

function MainStationControl({
  isOpenParams = false,
  publishId = "",
  modelId = "",
  tones = [],
  onSuccess,
  onSendingChange,
} : {
  isOpenParams?: boolean;
  publishId: string;
  modelId: string;
  tones: VoiceModelToneType[];
  onSuccess: (newInf: VoiceInfHistoryType) => void
  onSendingChange?: ({sending, infType} : {sending: boolean, infType: InfType}) => void
}) {
  const t = useTranslations();
  const toneList: Array<VoiceModelToneType> = [];
  const toneTypeList: Array<string> = [];
  const initInstantGenerateParamster:InstantGenerateParamsterType = {
    publish_id: publishId,
    model_id: modelId,
    inf_type: "audio",
    text: '',
    basic_params: DefaultVoiceModelBasicParams,
    advance_params: DefaultVoiceModelAdvancedParams,
    tone: {
      tone_type: "",
      audio_url: "",
      text: ""
    }
  }

  if (tones) {
    tones.map((tone) => {
      if (tone.tone_type === 'neutral') {
        initInstantGenerateParamster.tone = tone;
      }
      toneList.push(tone)
      toneTypeList.push(tone.tone_type)
    })
  }
  const [instantGenerateParamster, setInstantGenerateParamster] = useState<InstantGenerateParamsterType>(initInstantGenerateParamster);

  const onSuccessHandler = (newInf: VoiceInfHistoryType) => {
    handleConfetti()
    onSuccess && onSuccess(newInf);
  }

  return (
    <div className="flex-col justify-end items-center flex bottom-0 w-full">
      <MainStationControlParameters isOpen={isOpenParams} value={instantGenerateParamster} onChange={setInstantGenerateParamster} />
      <div className="self-stretch h-[188px] p-8 bg-neutral-900 shadow border-t border-neutral-800 flex-col justify-start items-start gap-5 flex">
        <Input
          color="primary"
          size="lg"
          type="text"
          variant="bordered"
          placeholder="Type context you want to convert here."
          value={instantGenerateParamster.text}
          onChange={(e) => {
            setInstantGenerateParamster({
              ...instantGenerateParamster,
              text: e.target.value
            })
          }}
        />
        <div className="self-stretch justify-between items-start inline-flex">
          <Select
            isDisabled={!modelId}
            items={toneListEn}
            variant="bordered"
            size="lg"
            className="w-[180px]"
            startContent={<div className="w-40 text-gray-500 text-sm font-semibold leading-normal"><p>Tones | </p></div>}
            selectedKeys={[instantGenerateParamster?.tone.tone_type as string]}
            onChange={(e) => {
              const selectTone = toneList.filter((tone) => tone.tone_type === e.target.value)[0]
              setInstantGenerateParamster({
                ...instantGenerateParamster,
                tone: selectTone
              })
            }}
          >
            {toneListEn.filter((tone) => toneTypeList.includes(tone.value)).map((tone) => (
              <SelectItem
                key={tone.value}
                value={tone.value}
                classNames={{
                  base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
                }}
                startContent={<UserIcon className="h-4 w-4"/>}
              >
                {tone.label}
              </SelectItem>
            ))}
          </Select>
          <div className="justify-start items-start gap-3 flex">
            <MainStationInfButton
              type="audio"
              isDisabled={!modelId || instantGenerateParamster.text.length === 0}
              value={instantGenerateParamster}
              onSuccess={(newInf) => {onSuccessHandler(newInf)}}
              onSendingChange={onSendingChange}
            />
            <MainStationInfButton
              type="code"
              isDisabled={!modelId}
              value={instantGenerateParamster}
              onSuccess={(newInf) => {onSuccessHandler(newInf)}}
              onSendingChange={onSendingChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainStationControl;
