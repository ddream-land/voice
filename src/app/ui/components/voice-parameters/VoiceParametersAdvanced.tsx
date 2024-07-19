"use client";
import React from "react";
import { VoiceModelAdvancedParamsType } from "@/app/lib/definitions.voice";
import { Input } from "@nextui-org/react";
import NuwaSliderInput from "../NuwaSliderInput";

function VoiceParametersAdvanced({
  value,
  onChange,
}: {
  value:VoiceModelAdvancedParamsType,
  onChange: (value:VoiceModelAdvancedParamsType)=>void,
}) {

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
          label: "text-gray-500 text-sm font-semibold leading-normal",
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
        maxValue={50} 
        minValue={1}
        value={value.top_k as number}
        onChange={(topK) => onChange({ ...value, top_k: topK })}
      />
      <NuwaSliderInput
        label="Top P"
        step={0.1} 
        maxValue={2} 
        minValue={0} 
        value={value.top_p as number}
        onChange={(topP) => onChange({ ...value, top_p: topP })}
      />
      <NuwaSliderInput
        label="Temperature"
        step={0.1} 
        maxValue={2} 
        minValue={0.1}
        value={value.temperature as number}
        onChange={(temperature) => onChange({ ...value, temperature: temperature })}
      />

    </div>
  );
}

export default VoiceParametersAdvanced;
