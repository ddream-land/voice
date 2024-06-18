"use client";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import {
  DefaultInstantGenerateParamster,
  TypeInstantGenerateParamster,
} from "@/app/lib/definitions.InstantGenerateParamster";
import VoiceParametersBasics from "../voice-parameters/VoiceParametersBasics";
import VoiceParametersAdvanced from "../voice-parameters/VoiceParametersAdvanced";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ToneVoiceFile from "../ToneVoiceFile";
import ExportIcon from "@/app/icons/ExportIcon";
import UploadFile from "../UploadFile";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";

function PublishUploadVoiceModelModal({}: {}) {
  const [parameters, setParameters] = useState<TypeInstantGenerateParamster>(
    DefaultInstantGenerateParamster
  );

  const languageList = [
    {
      value: "GPT-Sovits",
      label: "GPT-Sovits",
    },
    {
      value: "zh",
      label: "GPT-Sovits",
    },
    {
      value: "ja",
      label: "GPT-Sovits",
    },
  ];

  const [type, setType] = useState<string>("GPT-Sovits");

  return (
    <div className="w-full px-8 py-16 flex-col justify-start items-end gap-12 inline-flex">
      <div className="w-full flex-col justify-start items-start gap-12 flex">
        <TitleModal title="Upload Model" />
        <div className="self-stretch flex-col justify-start items-start gap-8 flex">
          <LabelForm label='Type' isRequired={true}>
            <Select
              variant="bordered"
              size="md"
              isRequired
              placeholder="Select an language"
              selectedKeys={[type]}
              onChange={(e) => setType(e.target.value)}
            >
              {languageList.map((Language) => (
                <SelectItem
                  key={Language.value}
                  value={Language.value}
                  classNames={{
                    base: "h-12 pl-2 pr-3 py-2 rounded-xl gap-4",
                  }}
                >
                  {Language.label}
                </SelectItem>
              ))}
            </Select>
          </LabelForm>

          <div className="w-full grid grid-cols-2 gap-12">
            <LabelForm label='GPT Model{" "}' isRequired={true}>
              <UploadFile
                label={
                  <div>
                    Drag and drop files here or click to upload
                    <br />
                    CKPT format
                  </div>
                }
                onClick={() => {
                  //setSelectModalOpen(true);
                }}
                icon={<ArrowUpTrayIcon className="w-6 h-6 fill-zinc-400 " />}
              ></UploadFile>
            </LabelForm>
            <LabelForm label='Sovits Model{" "}' isRequired={true}>
              <UploadFile
                label={
                  <div>
                    Drag and drop files here or click to upload
                    <br />
                    CKPT format
                  </div>
                }
                onClick={() => {
                  //setSelectModalOpen(true);
                }}
                icon={<ArrowUpTrayIcon className="w-6 h-6 fill-zinc-400 " />}
              ></UploadFile>
            </LabelForm>
          </div>
          <LabelForm label='Basic Parameters{" "}' isRequired={true}>
            <VoiceParametersBasics
              value={parameters}
              onChange={setParameters}
            />
          </LabelForm>
          <LabelForm label='Advanced Parameters{" "}' isRequired={true}>
            <VoiceParametersAdvanced
              value={parameters}
              onChange={setParameters}
            />
          </LabelForm>

          <LabelForm label='Tone Audio Files（Sentimental Voices）{" "}' subTitle="You may add up to 21 different tones, and the first one will be set as default." isRequired={true}>
            <div className="w-full flex flex-col gap-3">
              <ToneVoiceFile voiceSrc={"voiceSrc"} hideTrash={false} />
              <UploadFile
                label={<div>Drag and drop files here or click to upload<br />CKPT format</div>}
                onClick={() => {
                  // setSelectModalOpen(true);
                }}
                icon={<ExportIcon className="w-6 h-6" />}
              >
              </UploadFile>
            </div>
          </LabelForm>
        </div>
      </div>
    </div>
  );
}

export default PublishUploadVoiceModelModal;
