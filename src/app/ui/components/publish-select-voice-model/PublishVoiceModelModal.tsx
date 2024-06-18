"use client";
import React, { useState } from "react";
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
  DefaultInstantGenerateParamster,
  TypeInstantGenerateParamster,
} from "@/app/lib/definitions.InstantGenerateParamster";
import {
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import SelectVoiceModelForm from "./SelectVoiceModelForm";
import VoiceInformationForm from "./VoiceInformationForm";
import confetti from 'canvas-confetti';
import UploadVoiceModelForm from "./UploadVoiceModelForm";


function PublishVoiceModelModal({
  isOpen = false,
  variant,
  onChange = () => {},
}: {
  isOpen: boolean
  variant: 'LOCAL' | 'ONLINE'
  onChange: (isOpen: boolean) => void // 类型定义为函数，用于处理模态框的打开和关闭
}) {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const [parameters, setParameters] = useState<TypeInstantGenerateParamster>(
    DefaultInstantGenerateParamster
  );

  const uploadModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

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

  const [step, setStep] = useState<1|2>(1);

  return (
    <>
      <DrawerModal modalDisclosure={uploadModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="px-[198px]">
                  {step === 1 && (
                    <>
                      {variant === 'LOCAL' && (<SelectVoiceModelForm />)}
                      {variant === 'ONLINE' && (<UploadVoiceModelForm />)}
                    </>
                  )}
                  {step === 2 && (
                    <VoiceInformationForm />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="px-[198px]">
                  <div className="px-8 inline-flex gap-4">
                    {step === 1 && (
                      <Button
                        size="lg"
                        color="primary"
                        variant="solid"
                        endContent={<ArrowRightIcon className="w-6 h-6 fill-white" />}
                        onPress={() => setStep(2)}
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
                          variant="solid"
                          onPress={() => {
                            handleConfetti()
                          }}
                        >Publish</Button>
                      </>
                    )}
                    
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </DrawerModal>
    </>
  );
}

export default PublishVoiceModelModal;
