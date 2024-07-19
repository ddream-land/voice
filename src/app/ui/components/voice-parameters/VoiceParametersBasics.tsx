"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { VoiceModelBasicParamsType } from "@/app/lib/definitions.voice";
import { Select, SelectItem } from "@nextui-org/react";
import NuwaSliderInput from "../NuwaSliderInput";
import { languageListEn, segmentationMethodListEn } from "@/app/lib/definitions.select";


function VoiceParametersBasics({
  value,
  onChange,
}: {
  value:VoiceModelBasicParamsType,
  onChange: (value:VoiceModelBasicParamsType)=>void,
}) {
  const t = useTranslations();

  return (
    <div className="self-stretch rounded-xl justify-end items-center gap-x-12 gap-y-7 grid grid-cols-1 lg:grid-cols-2">
      <Select
        disallowEmptySelection={true}
        variant="bordered"
        size="lg"
        label="Language"
        placeholder="Select an language"
        labelPlacement="outside"
        selectedKeys={[value.language as string]}
        classNames={{
          label: "group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500 text-gray-500 text-sm font-semibold leading-normal",
        }}
        onChange={(e) => onChange({ ...value, language: e.target.value })}
      >
        {languageListEn.map((Language) => (
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
        maxValue={2} 
        minValue={0.5} 
        value={value.speed as number}
        onChange={(speed) => onChange({ ...value, speed: speed })}
      />
      <Select
        disallowEmptySelection={true}
        variant="bordered"
        size="lg"
        label="Segmentation Method"
        placeholder="Select an segmentation method"
        labelPlacement="outside"
        selectedKeys={[value.seg_method as string]}
        onChange={(e) => onChange({ ...value, seg_method: e.target.value })}
        classNames={{
          label: "group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500 text-gray-500 text-sm font-semibold leading-normal",
        }}
      >
        {segmentationMethodListEn.map((smItem) => (
            <SelectItem
              key={smItem.value}
              value={smItem.value}
              classNames={{
                base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
              }}
            >
              {smItem.label}
            </SelectItem>
        ))}
      </Select>
      <NuwaSliderInput
        label="Max words allowed per sentence"
        step={1} 
        maxValue={1000} 
        minValue={5}
        value={value.m_w_a_p_s as number}
        onChange={(m_w_a_p_s) => onChange({ ...value, m_w_a_p_s: m_w_a_p_s })}
      />
    </div>
  );
}

export default VoiceParametersBasics;
