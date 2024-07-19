"use client";
import React, { ReactNode } from "react";

function TitleModal({
  title
}: {
  title: ReactNode
}) {

  return (
    <div className="h-12 flex-col justify-start items-start gap-5 flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="text-white text-5xl font-semibold leading-[48px]">
          {title}
        </div>
      </div>
    </div>
  );
}

export default TitleModal;
