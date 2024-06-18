"use client";
import React from "react";
import ToneVoicePreview from "../components/ToneVoicePreview";

function VoiceAssetDetailLeft() {
  return (
    <div className="w-full flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch justify-start items-start gap-6 inline-flex">
        <img
          className="w-[200px] h-[200px] rounded-xl"
          src="https://via.placeholder.com/200x200"
        />
        <div className="grow overflow-scroll">
          <div className="basis-0 text-white text-sm font-normal font-['Inter'] leading-tight">
            Please check out my other base models, including SDXL ones!
            <br />
            Check the version description below (bottom right) for more info and
            add a ❤️ to receive future updates.
            <br />
            Do you like what I do? Consider supporting me on Patreon 🅿️ to get
            exclusive tips and tutorials, or feel free to buy me a coffee ☕
          </div>
        </div>
      </div>

      <div className="self-stretch flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <div className="text-white text-xl font-semibold font-['Inter'] leading-7">
            Tones Preview
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
          <ToneVoicePreview voiceSrc="" />
        </div>
      </div>
    </div>
  );
}

export default VoiceAssetDetailLeft;
