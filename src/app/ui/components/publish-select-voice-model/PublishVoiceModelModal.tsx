"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import DrawerModal from "../DrawerModal";
import {
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import SelectVoiceModelForm from "./SelectVoiceModelForm";
import VoiceInformationForm from "./VoiceInformationForm";
import UploadVoiceModelForm from "./UploadVoiceModelForm";
import { DefaultVoiceModelFormData, VoiceModelFormDataProps, VoicePublishInfoType } from "@/app/lib/definitions.voice";
import { z } from "zod";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import { getModelId, voiceModelPublish } from "@/app/lib/voice.api";
import PublishResultModal from "./PublishResultModal";
import { findIndex, uniqBy } from "lodash-es";
import { handleConfetti } from "@/app/lib/utils";

function PublishVoiceModelModal({
  isOpen = false,
  variant,
  modelId,
  onChange = () => {},
  onSuccess = () => {},
}: {
  isOpen: boolean
  variant: 'SELECT' | 'UPLOAD'
  modelId?: string
  onChange: (isOpen: boolean) => void // 类型定义为函数，用于处理模态框的打开和关闭
  onSuccess: () => void
}) {
  const uploadModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

  const [step, setStep] = useState<1|2>(1);
  const amDispatch = useAmDispatch();
  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [publishResultModalOpen, setPublishResultModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    ...DefaultVoiceModelFormData,
    publish_type: variant === 'UPLOAD' ? 2 : 1,
    model_id: modelId ? modelId : ''
  } as VoiceModelFormDataProps);

  const currentFormData= useRef(formData)

  // useEffect(() => {
  //   currentFormData.current = formData
  // })

  const UploadFormSchema = z.object({
    gptWeightsUrl: z.string({
      required_error: "gptWeightsUrl is required",
      invalid_type_error: "gptWeightsUrl must be a string",
    }).url({message: 'Please enter a valid URL for the GPT weights'}), 
    sovitsWeightsUrl: z.string({
      required_error: "sovitsWeightsUrl is required",
      invalid_type_error: "sovitsWeightsUrl must be a string",
    }).url({message: 'Please enter a valid URL for the Sovits weights'}), 
    tone: z.array(z.object({
      tone_type: z.string({
        required_error: "tone_type is required",
        invalid_type_error: "tone_type must be a string",
      }),
      audio_url: z.string({
        required_error: "audio_url is required",
        invalid_type_error: "audio_url must be a string",
      }).url({message: 'Please enter a valid URL for the tone'}),
      text: z.string({
        invalid_type_error: "text must be a string",
      }).min(1, { message: "text is required" }),
    })).min(1, {message: 'Please upload at least one tone'}),
  });

  const SelectFormSchema = z.object({
    modelId: z.string({
      required_error: "select model is required",
    }).min(1, { message: "select model is required" }),
    tone: z.array(z.object({
      tone_type: z.string({
        required_error: "tone_type is required",
        invalid_type_error: "tone_type must be a string",
      }),
      audio_url: z.string({
        required_error: "audio_url is required",
        invalid_type_error: "audio_url must be a string",
      }).url({message: 'Please enter a valid URL for the tone'}),
      text: z.string({
        invalid_type_error: "text must be a string",
      }).min(1, { message: "text is required" }),
    })).min(1, {message: 'Please upload at least one tone'}),
  });

  const VoiceInfoSchema = z.object({
    cover:z.string({
      required_error: "cover is required",
      invalid_type_error: "cover must be a string",
    }).url({message: 'Please enter a valid URL for the cover'}),
    name:z.string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    }).min(1, { message: "name is required" }),
    type:z.string({
      required_error: "type is required",
      invalid_type_error: "type must be a string",
    }).min(1, { message: "type is required" }),
  });

  const getModelIdApi = getModelId();
  const getModelIdToServer = async () => {

    if (loading) {
      return;
    }
    setLoading(true);
    const res = await getModelIdApi.send({
    });
    if (res && res.code === 0) {
      setFormData({
        ...formData,
        model_id: res.data,
      })
    }

    setLoading(false);
    if (!isInit) {
      setInit(true);
    }
  };

  const voiceModelPublishApi = voiceModelPublish();

  const nextButtonHandler = () => { 
    let validatedFields; 
    if (variant === 'UPLOAD') {
      validatedFields = UploadFormSchema.required().safeParse({
        gptWeightsUrl: formData.local_model["gpt-weights_url"], 
        sovitsWeightsUrl: formData.local_model["sovits-weights_url"],
        tone: formData.tone
      });
    } else {
      validatedFields = SelectFormSchema.required().safeParse({
        modelId: formData.model_id,
        tone: formData.tone
      });
    }
    

    if (!validatedFields.success) {
      validatedFields.error.issues.map((item) => {
        amDispatch({
          type: "add",
          payload: {
            type: "error",
            message: item.message,
          },
        })
      })
      return;
    }

    if (uniqBy(formData.tone, 'tone_type').length !== formData.tone.length) {
      amDispatch({
        type: "add",
        payload: {
          type: "error",
          message: 'Tone type must be unique',
        },
      })
      return;
    }

    if (findIndex(formData.tone, (o) => { return o.tone_type === 'neutral'; }) === -1) {
      amDispatch({
        type: "add",
        payload: {
          type: "error",
          message: 'Please add at least one neutral tone'
        }
      })
      return;
    }

    setStep(2);
  }
  const publishHandler = async () => {
    const validatedFields = VoiceInfoSchema.required().safeParse({
      cover: formData.publish_info.cover_url, 
      name: formData.publish_info.name,
      type: formData.publish_info.type
    });
  
    if (validatedFields.success) {
      const res = await voiceModelPublishApi.send(formData);
      if (res && res.code === 0) {
        publishSuccessHander();
      }
    } else {
      validatedFields.error.issues.map((item) => {
        amDispatch({
          type: "add",
          payload: {
            type: "error",
            message: item.message,
          },
        })
      })
    }
  }
  const publishSuccessHander = () => {
    handleConfetti()
    setPublishResultModalOpen(true);
    onChange && onChange(false);
    onSuccess && onSuccess();
  }

  useEffect(() => {
    if (isOpen) {
      if (variant === 'UPLOAD') {
        getModelIdToServer();
      }
    }
  }, [isOpen]);

  return (
    <>
      <DrawerModal modalDisclosure={uploadModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="sm:px-0 md:[px-50px] lg:px-[100px] xl:px-[150px] 2xl:px-[200px] w-full py-16 inline-flex">
                  {step === 1 && (
                    <>
                      {variant === 'SELECT' && (
                        <SelectVoiceModelForm
                          formData={formData}
                          modelId={modelId}
                          onChange={(newFormData: VoiceModelFormDataProps) => setFormData(newFormData) }
                        />
                      )}
                      {variant === 'UPLOAD' && (
                        <UploadVoiceModelForm
                          formData={formData}
                          onChange={(newFormData: VoiceModelFormDataProps) => setFormData(newFormData) }
                        />
                      )}
                    </>
                  )}
                  {step === 2 && (
                    <VoiceInformationForm
                      value={formData.publish_info}
                      onChange={(newPublishInfo: VoicePublishInfoType) => setFormData({
                        ...formData,
                        publish_info: newPublishInfo,
                      }) }
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="sm:px-0 md:[px-50px] lg:px-[100px] xl:px-[150px] 2xl:px-[200px] w-full flex flex-row justify-end gap-4">
                  {step === 1 && (
                    <Button
                      size="lg"
                      color="primary"
                      variant="ghost"
                      endContent={<ArrowRightIcon className="w-6 h-6 fill-primary" />}
                      onPress={() => {
                        nextButtonHandler();
                      }}
                    >Next</Button>
                  )}
                  {step === 2 && (
                    <>
                      <Button
                        size="lg"
                        color="default"
                        variant="ghost"
                        startContent={<ArrowLeftIcon className="w-6 h-6 fill-white" />}
                        onPress={() => setStep(1)}
                      >Previous</Button>
                      <Button
                        size="lg"
                        color="primary"
                        variant="ghost"
                        onPress={publishHandler}
                      >Publish</Button>
                    </>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </DrawerModal>
      <PublishResultModal isOpen={publishResultModalOpen} onChange={() => {
        setPublishResultModalOpen(false);
      }} />
    </>
  );
}

export default PublishVoiceModelModal;
