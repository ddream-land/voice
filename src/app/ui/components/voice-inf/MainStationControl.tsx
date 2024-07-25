"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toneListEn, toneListZhCN } from "@/app/lib/definitions.tone";
import { UserIcon } from "@heroicons/react/24/outline";
import MainStationControlParameters from "./MainStationControlParameters";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { DefaultVoiceModelAdvancedParams, DefaultVoiceModelBasicParams, InfType, InstantGenerateParamsterType, VoiceInfHistoryType, VoiceModelToneType } from "@/app/lib/definitions.voice";
import MainStationInfButton from "./MainStationInfButton";
import { handleConfetti } from "@/app/lib/utils";
import { getInfCost } from "@/app/lib/voice.api";
import { debounce, throttle } from "lodash-es";

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
  const locale = useLocale();
  const toneListMap = locale === "en" ? toneListEn : toneListZhCN;
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
    },
    price: 0,
    code: '',
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
  const instantGenerateParamsterRef = useRef(instantGenerateParamster);


  useEffect(() => {
    instantGenerateParamsterRef.current = instantGenerateParamster
  })

  const onSuccessHandler = (newInf: VoiceInfHistoryType) => {
    handleConfetti()
    onSuccess && onSuccess(newInf);
  }

  const textChangeCount = useRef(0);
  // const [textChangeCount, setTextChangeCount] = useState(0)
  const [textCostObj, setTextCostObj] = useState<any>({})
  const getInfCostApi = getInfCost();

  const getInfCostServer = async (text: string, textChangeCounta: number) => {
    const res = await getInfCostApi.send({
      text: text,
    })

    if (res && res.code === 0) {
      if (textChangeCounta === textChangeCount.current) {
        setInstantGenerateParamster({
          ...instantGenerateParamsterRef.current,
          price: res.data.price,
          code: res.data.code
        })
        setTextCostObj({
          ...textCostObj,
          [textChangeCounta]: true
        })
      }
    }
  }

  const getInfCostServerDebounce = debounce(getInfCostServer, 2000);
  const getInfCostServerThrottle = throttle(getInfCostServer, 2000);

  return (
    <div className="flex-col justify-end items-center flex bottom-0 w-full">
      <MainStationControlParameters isOpen={isOpenParams} value={instantGenerateParamster} onChange={setInstantGenerateParamster} />
      <div className="self-stretch h-[188px] p-8 bg-neutral-900 shadow border-t border-neutral-800 flex-col justify-start items-start gap-5 flex">
        <Input
          color="primary"
          size="lg"
          type="text"
          variant="bordered"
          placeholder={t("VoiceInf.toneTextPlaceholder")}
          value={instantGenerateParamster.text}
          onChange={async (e) => {
            const nextText = e.target.value;
            setInstantGenerateParamster({
              ...instantGenerateParamster,
              text: nextText
            })
            const newTextChangeCount = textChangeCount.current + 1
            textChangeCount.current = newTextChangeCount
            setTextCostObj({
              ...textCostObj,
              [newTextChangeCount]: false
            })
            
            // await getInfCostServerDebounce(nexText);
            await getInfCostServerDebounce(nextText, newTextChangeCount)
          }}
        />
        <div className="self-stretch justify-between items-start inline-flex">
          <Select
            isDisabled={!modelId}
            items={toneListMap}
            variant="bordered"
            size="lg"
            className="w-[180px]"
            startContent={<div className="w-40 text-gray-500 text-sm font-semibold leading-normal"><p>{t("VoiceInf.tonesLabel")} | </p></div>}
            selectedKeys={[instantGenerateParamster?.tone.tone_type as string]}
            onChange={(e) => {
              const selectTone = toneList.filter((tone) => tone.tone_type === e.target.value)[0]
              setInstantGenerateParamster({
                ...instantGenerateParamster,
                tone: selectTone
              })
            }}
          >
            {toneListMap.filter((tone) => toneTypeList.includes(tone.value)).map((tone) => (
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
              isDisabled={!modelId || instantGenerateParamster.text.length === 0 || !textCostObj[textChangeCount.current]}
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
