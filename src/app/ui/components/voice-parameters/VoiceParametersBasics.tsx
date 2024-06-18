"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { TypeInstantGenerateParamster } from "@/app/lib/definitions.InstantGenerateParamster";
import { Select, SelectItem } from "@nextui-org/react";
import NuwaSliderInput from "../NuwaSliderInput";


function VoiceParametersBasics({
  value,
  onChange,
}: {
  value:TypeInstantGenerateParamster,
  onChange: (value:TypeInstantGenerateParamster)=>void,
}) {
  const t = useTranslations();
  const [selected, setSelected] = useState("photos");
  const [isReset, setIsReset] = useState(false);

  const languageList = [{
    value: "en",
    label: "English"
  }, {
    value: "zh",
    label: "中文"
  }, {
    value: "ja",
    label: "日本語"
  }, {
    value: "ko",
    label: "한국어"
  }, {
    value: "es",
    label: "Español"
  }, {
    value: "fr",
    label: "Français"
  }];

  return (
    <div className="self-stretch rounded-xl justify-end items-center gap-x-12 gap-y-7 grid grid-cols-1 lg:grid-cols-2">
      <Select
        variant="bordered"
        size="lg"
        label="Language"
        placeholder="Select an language"
        labelPlacement="outside"
        selectedKeys={[value.language]}
        classNames={{
          label: "group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500 text-gray-500 text-sm font-semibold font-['Inter'] leading-normal",
        }}
        onChange={(e) => onChange({ ...value, language: e.target.value })}
      >
        {languageList.map((Language) => (
            <SelectItem
              key={Language.value}
              value={Language.value}
              classNames={{
                base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
              }}
            >
              {Language.label}
            </SelectItem>
        ))}
      </Select>
      <NuwaSliderInput
        label="Speed"
        step={0.01} 
        maxValue={4} 
        minValue={0.25} 
        value={value.speed}
        onChange={(speed) => onChange({ ...value, speed: speed })}
      />
      <Select
        variant="bordered"
        size="lg"
        label="Segmentation Method"
        placeholder="Select an segmentation method"
        labelPlacement="outside"
        selectedKeys={[value.segmentationMethod]}
        onChange={(e) => onChange({ ...value, segmentationMethod: e.target.value })}
        classNames={{
          label: "group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500 text-gray-500 text-sm font-semibold font-['Inter'] leading-normal",
        }}
      >
        {languageList.map((Language) => (
            <SelectItem
              key={Language.value}
              value={Language.value}
              classNames={{
                base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
              }}
            >
              {Language.label}
            </SelectItem>
        ))}
      </Select>
      <NuwaSliderInput
        label="Max words allowed per sentence"
        step={1} 
        maxValue={500} 
        minValue={5} 
        value={value.maxWords}
        onChange={(maxWords) => onChange({ ...value, maxWords: maxWords })}
      />

    </div>
  );
}

export default VoiceParametersBasics;
