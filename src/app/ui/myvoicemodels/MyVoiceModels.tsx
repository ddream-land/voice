"use client";
import React, { useState } from "react";
import UploadFile from "../components/UploadFile";
import TrainIcon from "@/app/icons/TrainIcon";
import TrainList from "./TrainList";
import TrainVoiceModelModal from "./TrainVoiceModelModal";

function MyVoiceModels() {

  const [selectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen pt-20 px-8 pb-6 bg-zinc-900 rounded-bl-xl rounded-br-xl flex-col justify-start items-start gap-6 inline-flex">
        <div className="text-white text-xl font-semibold font-['Inter'] leading-7">
          My Voice Models
        </div>
        <div className="self-stretch h-[72px]">
          <UploadFile
            label={<div className="justify-center items-center flex gap-3">
              <TrainIcon className="w-6 h-6 fill-blue-600" />
              <span>Train My Voice Model</span>
            </div>}
            onClick={() => {
              setSelectModalOpen(true);
            }}
          >
          </UploadFile>
        </div>
        <div className="text-zinc-400 text-sm font-normal font-['Inter'] leading-tight">
          You haven't created any voice
        </div>
        <TrainList />
      </div>

      <TrainVoiceModelModal
        isOpen={selectModalOpen}
        onChange={(isOpen) => {
          setSelectModalOpen(isOpen);
        }}
      />
    </>
  );
}

export default MyVoiceModels;
