"use client";
import React from "react";
import NuwaFormWrapper from "./NuwaFormWrapper";

function NuwaTextareaWrapper({label, textareaProps}: {label?: string, textareaProps: Object}) {
  return (
    <NuwaFormWrapper label={label}>
      <textarea
        {...textareaProps}
        className="border-none outline-none w-full h-full resize-none mb-6 text-[#272727] disabled:bg-transparent"
      />
    </NuwaFormWrapper>
  );
}

export default NuwaTextareaWrapper;
