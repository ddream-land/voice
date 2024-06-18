"use client";
import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function UploadFile({
  label,
  icon,
  onClick,
  fileName,
  fileNameIcon,

}: {
  label:ReactNode
  icon?: ReactNode
  onClick?: () => void
  fileName?: ReactNode
  fileNameIcon?: ReactNode
}) {

  const [fileNameStr, setFileNameStr] = React.useState(fileName);


  return (
    <div className="w-full h-full">
    {fileNameStr ? (
      <div className="w-full h-full px-6 bg-zinc-800 rounded-xl justify-between items-center gap-3 inline-flex">
        <div className="justify-start items-center gap-3 flex text-slate-100 text-base font-normal font-['Inter'] leading-normal">
          {fileNameIcon && (
            <div className="w-6 h-6 justify-center items-center flex">
              {fileNameIcon}
            </div>
          )}
          <div className="text-slate-100 text-base font-normal font-['Inter'] leading-normal">
            {fileName}
          </div>
        </div>
        <div className=" cursor-pointer p-1 bg-black w-6 h-6 rounded-full justify-center items-center gap-2 flex">
          <XMarkIcon className="h-4 w-4 fill-white stroke-white" onClick={() => {
            setFileNameStr("")
          }} />
        </div>
      </div>
    ): (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className=" cursor-pointer grow shrink basis-0 w-full h-full p-4 rounded-2xl border-dashed border-2 border-zinc-700 flex-col justify-center items-center gap-2 inline-flex"
      >
        {icon}
        <div className="text-center text-zinc-400 text-xs font-medium font-['Inter']">
          {label}
        </div>
      </div>
    )}
    </div>
  );
}

export default UploadFile;
