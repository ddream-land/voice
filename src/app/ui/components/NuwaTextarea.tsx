"use client";
import { Textarea } from "@nextui-org/react";
import React from "react";

export const textareaProps = {
  variant: "bordered",
  labelPlacement: "outside",
  size: "lg",
  minRows: 5,
  maxRows: 5,
  classNames: {
    label: "text-2xl text-neutral-800 font-bold tracking-tight mb-6 block",
    input: "text-black text-sm font-normal leading-relaxed tracking-tight",
    inputWrapper: "border",
    innerWrapper: "h-[115px]"
  },
  className: "border-none outline-none w-full h-full resize-none text-[#272727] disabled:bg-transparent break-all",
}

function NuwaTextarea(...props: any) {
  return (
    <>
      <label className={textareaProps.classNames.label}>
        {props[0].label}
      </label>
      <Textarea
        {...props[0]}
        {...textareaProps}
        label=""
      />
    </>
      
  );
}

export default NuwaTextarea;
