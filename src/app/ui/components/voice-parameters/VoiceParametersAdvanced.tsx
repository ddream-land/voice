"use client";
import React from "react";
import { TypeInstantGenerateParamster } from "@/app/lib/definitions.InstantGenerateParamster";
import { Input } from "@nextui-org/react";
import NuwaSliderInput from "../NuwaSliderInput";

function VoiceParametersAdvanced({
  value,
  onChange,
}: {
  value:TypeInstantGenerateParamster,
  onChange: (value:TypeInstantGenerateParamster)=>void,
}) {

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
      <Input
        color="primary"
        variant="bordered"
        size="lg"
        label="Seed"
        type="number"
        min={-1}
        placeholder="Input seed"
        labelPlacement="outside"
        value={String(value.seed)}
        classNames={{
          label: "text-gray-500 text-sm font-semibold font-['Inter'] leading-normal",
        }}
        onChange={(e) => {
          let newSeed = Math.floor(Number(e.target.value))
          if (newSeed < -1) {
            newSeed = 1
          }
          onChange({ ...value, seed: newSeed })
        }}
      />
      <NuwaSliderInput
        label="Top K"
        step={1} 
        maxValue={30} 
        minValue={1}
        value={value.topK}
        onChange={(topK) => onChange({ ...value, topK: topK })}
      />
      <NuwaSliderInput
        label="Top P"
        step={0.1} 
        maxValue={1} 
        minValue={0} 
        value={value.topP}
        onChange={(topP) => onChange({ ...value, topP: topP })}
      />
      <NuwaSliderInput
        label="Temperature"
        step={0.1} 
        maxValue={1} 
        minValue={0}
        value={value.temperature}
        onChange={(temperature) => onChange({ ...value, temperature: temperature })}
      />

    </div>
  );
}

export default VoiceParametersAdvanced;
