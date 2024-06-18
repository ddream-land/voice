"use client";
import React, { ReactNode } from "react";

function NuwaFormWrapper({label, children}: {label: string | ReactNode, children: ReactNode}) {
  return (
    <div className="h-full px-5 py-6 flex flex-col">
      {label && <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {label}
      </label>}
      <div className="flex flex-row mt-2 grow">  
        <div className="grow">
          {children}
        </div>
      </div>     
    </div>
  );
}

export default NuwaFormWrapper;
