"use client";
import React from "react";
import NuwaFormWrapper from "./NuwaFormWrapper";
import { Radio, RadioGroup } from "@nextui-org/react";

function NuwaRadioWrapper({label, radioProps, radioList}: {label: string, radioProps: Object, radioList: Array<{value: any, name: string}>}) {
  return (
    <NuwaFormWrapper label={label}>
        <RadioGroup
          color="default"
          orientation="horizontal"
          {...radioProps}
        >
          {radioList.map((item, index) => (
            <Radio value={item.value} key={index}>{item.name}</Radio>
          ))}
        </RadioGroup>
    </NuwaFormWrapper>
  );
}

export default NuwaRadioWrapper;
