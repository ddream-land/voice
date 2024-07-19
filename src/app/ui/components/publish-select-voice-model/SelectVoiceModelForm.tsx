"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import {
  VoiceModelFormDataProps,
  VoiceModelToneType,
} from "@/app/lib/definitions.voice";
import SelectVoiceModelModal from "./SelectVoiceModelModal";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";
import ToneVoiceFileList from "../voice-preview/ToneVoiceFileList";
import { getModelList, getVoiceModelInfo } from "@/app/lib/voice.api";
import { VoiceModelInfoType } from "@/app/lib/definitions.voice";
import { languageListEn } from "@/app/lib/definitions.select";

type myModelType = {
  task_id: string
  task_name: string
  model_id: string
  tones: Array<VoiceModelToneType>
}

function SelectVoiceModelForm({
  formData,
  modelId,
  onChange
}: {
  formData: VoiceModelFormDataProps
  modelId?: string | undefined,
  onChange?: (newFormData: VoiceModelFormDataProps) => void,
}) {
  const [loading, setLoading] = useState(false);
  const [myModelList, setMyModelList] = useState<Array<myModelType>>([])

  const [selectToneList, setSelectToneList] = useState<Array<VoiceModelToneType>>([])
  const [selectVoiceModelInfo, setSelectVoiceModelInfo] = useState<VoiceModelInfoType | null>(null)
  const getModelListApi = getModelList();

  const getModelListToServer = async () => {

    if (loading) {
      return;
    }
    setLoading(true);
    const res = await getModelListApi.send({
    });
    if (res && res.code === 0) {
      setMyModelList(res.data.list);
      
      if (modelId) {
        getVoiceModelInfoServer(modelId);
      }
    }

    setLoading(false);
  };

  const getVoiceModelInfoApi = getVoiceModelInfo();
  const getVoiceModelInfoServer = async (modelId: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const res = await getVoiceModelInfoApi.send({
      model_id: modelId
    });
    if (res && res.code === 0) {
      setSelectVoiceModelInfo(res.data);
      setSelectToneList(res.data.slicer)
    }

    setLoading(false);
  };

  const [selectModalOpen, setSelectModalOpen] = useState(false);

  useEffect(() => {
    getModelListToServer();
  }, []);
  
  return (
    <>
      <div className="w-full flex-col justify-start items-start gap-12 flex">
        <TitleModal title="Select Model" />
        <div className="self-stretch flex-col justify-start items-start gap-8 flex">
          <LabelForm label='Select' isRequired={true}>
            <Select
              isDisabled={!!modelId ? true : false}
              disallowEmptySelection={true}
              variant="bordered"
              size="lg"
              placeholder="Select model type"
              labelPlacement="outside"
              selectedKeys={[formData.model_id]}
              defaultSelectedKeys={[modelId || '']}
              onChange={(e) => {
                const selectedModelId = e.target.value;
                if (onChange) {
                  onChange({
                    ...formData,
                    model_id: selectedModelId,
                  });
                }

                getVoiceModelInfoServer(selectedModelId);

                // setSelectToneList(myModelList.find((item) => item.model_id === selectedModelId)?.tones ?? [])
              }}
            >
              {myModelList.map((mtItem) => (
                <SelectItem
                  key={mtItem.model_id}
                  value={mtItem.model_id}
                  classNames={{
                    base: "h-12 pl-2 pr-3 py-2 rounded-xl gap-4",
                  }}
                >
                  {mtItem.task_name}
                </SelectItem>
              ))}
            </Select>
          </LabelForm>
          
          <LabelForm label='Basic Parameters' isRequired={true}>
            <Select
              disallowEmptySelection={true}
              variant="bordered"
              size="lg"
              label="Language"
              placeholder="Select an language"
              labelPlacement="outside"
              selectedKeys={[formData.basic_params.language]}
              classNames={{
                label: "group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500 text-gray-500 text-sm font-semibold leading-normal",
              }}
              onChange={(e) => {
                onChange && onChange({
                  ...formData,
                  basic_params: {
                    ...formData.basic_params,
                    language: e.target.value,
                  }
                } as VoiceModelFormDataProps)
              }}
            >
              {languageListEn.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  classNames={{
                    base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
                  }}
                >
                  {lang.label}
                </SelectItem>
              ))}
            </Select>
          </LabelForm>
          <LabelForm label='Tone Audio Files（Sentimental Voices）' subTitle="You may add up to 21 different tones, and the first one will be set as default." isRequired={true}>
            <ToneVoiceFileList
              key={formData.model_id + "-" + selectToneList.length}
              toneList={formData.tone}
              modelId={formData.model_id}
              selectToneList={selectToneList}
              onChange={(newTone) => {
                onChange && onChange({
                  ...formData,
                  tone: newTone
                } as VoiceModelFormDataProps)
              }}
            />
          </LabelForm>
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
