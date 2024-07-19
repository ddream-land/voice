"use client";
import React, { ReactNode } from "react";

function LabelForm({
  label,
  subTitle,
  isRequired = false,
  children,
}: {
  label: ReactNode;
  subTitle?: ReactNode;
  isRequired?: boolean;
  children?: ReactNode;
}) {
  
  return (
    <div className="rounded-xl flex-col justify-start items-start gap-2 flex w-full">
      <div className="self-stretch justify-start items-center gap-0.5 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-center items-start gap-0.5 inline-flex">
          <div className="self-stretch">
            <span className="text-white text-base font-semibold leading-normal">
              {label}
            </span>
            {isRequired && (
              <span className="text-rose-600 text-base font-semibold leading-normal">
                *
              </span>
            )}
          </div>
          {subTitle && (
            <div className="self-stretch text-zinc-400 text-sm font-medium leading-tight">
              {subTitle}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}

export default LabelForm;
