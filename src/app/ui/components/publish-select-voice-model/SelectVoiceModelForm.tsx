"use client";
import React, { useState } from "react";
import {
  Select,
  SelectItem
} from "@nextui-org/react";
import {
  DefaultInstantGenerateParamster,
  TypeInstantGenerateParamster,
} from "@/app/lib/definitions.InstantGenerateParamster";
import VoiceParametersBasics from "../voice-parameters/VoiceParametersBasics";
import VoiceParametersAdvanced from "../voice-parameters/VoiceParametersAdvanced";
import ToneVoiceFile from "../ToneVoiceFile";
import ExportIcon from "@/app/icons/ExportIcon";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import SelectVoiceModelModal from "./SelectVoiceModelModal";
import UploadFile from "../UploadFile";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";

function SelectVoiceModelForm({
}: {
}) {
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
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <>
      <div className="w-full px-8 py-16 flex-col justify-start items-end gap-12 inline-flex">
        <div className="w-full flex-col justify-start items-start gap-12 flex">
          <TitleModal title="Select Model" />
          <div className="self-stretch flex-col justify-start items-start gap-8 flex">
            <LabelForm label='Type' isRequired={true}>
              <Select
                variant="bordered"
                size="md"
                placeholder="Select an language"
                labelPlacement="outside"
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
                <div className="w-full h-[136px] justify-start items-center gap-3 inline-flex">
                  <UploadFile label="Select From Training Audio File"
                    onClick={() => {
                      setSelectModalOpen(true);
                    }}
                    icon={<PlusCircleIcon className="w-6 h-6 stroke-zinc-400" />}
                  >
                  </UploadFile>
                  <div className="w-[136px] h-full">
                    <UploadFile
                      label="upload"
                      onClick={() => {
                        // setSelectModalOpen(true);
                      }}
                      icon={<ExportIcon className="w-6 h-6" />}
                    >
                    </UploadFile>
                  </div>
                </div>
              </div>
              
            </LabelForm>
          </div>
        </div>
      </div>

      <SelectVoiceModelModal
        isOpen={selectModalOpen}
        onChange={(isOpen) => {
          setSelectModalOpen(isOpen);
        }}
      />
    </>
  );
}

export default SelectVoiceModelForm;
