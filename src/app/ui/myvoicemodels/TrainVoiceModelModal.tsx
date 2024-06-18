"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import ToneVoiceFile from "../components/ToneVoiceFile";
import UploadFile from "../components/UploadFile";
import BDocumentIcon from "@/app/icons/BDocumentIcon";
import LabelForm from "../components/form/LabelForm";
import FlashIcon from "@/app/icons/FlashIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";

function TrainVoiceModelModal({
  isOpen = false,
  onChange = () => {},
}: {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void; // 类型定义为函数，用于处理模态框的打开和关闭
}) {

  const trainVoiceModelModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

  return (
      <Modal 
        size="4xl"
        isOpen={trainVoiceModelModal.isOpen}
        placement={'center'}
        scrollBehavior="inside"
        onOpenChange={trainVoiceModelModal.onOpenChange}
        // classNames={{
        //   base: "h-11/12 rounded-t-lg overflow-hidden bg-transparent shadow-none",
        //   header: "rounded-t-lg overflow-hidden bg-transparent",
        //   body: "bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl px-[120px]",
        // }}
        closeButton={<div><XMarkIcon className="w-10 h-10 fill-zinc-400" /></div>}
        hideCloseButton={false}
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex flex-col">
                <div className="text-white text-2xl font-bold font-['Inter'] leading-loose">Train My Voice Model</div>
                <div className="self-stretch"><span className="text-white text-sm font-normal font-['Inter'] leading-tight">For best result, upload a clear 6-12 mins audio clip (anything beyond 12 mins will be clipped). Avoid background noise.</span><span className="text-blue-600 text-sm font-normal font-['Inter'] leading-tight"> </span><span className="text-blue-600 text-sm font-semibold font-['Inter'] leading-tight">{'Learn More >'}</span></div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="w-full bg-zinc-900 rounded-2xl shadow flex-col justify-start items-start gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                  <div className="self-stretch h-40">
                    <UploadFile
                      label={
                        <div className="flex-col justify-center items-center gap-2.5 flex">
                          <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">Upload Sound File</div>
                          <div className="w-[405px] text-center text-zinc-400 text-xs font-medium font-['Inter']">Click or drag to upload an audio file Supported formats: MP3/WAV/FLAC</div>
                        </div>
                      }
                      icon={<BDocumentIcon className='h-6 w-6' />}
                      onClick={() => {
                      }}
                      >
                    </UploadFile>
                  </div>
                  <ToneVoiceFile voiceSrc={"voiceSrc"} hideTrash={false} />

                  <LabelForm label="Voice Model Name" isRequired={true}>
                    <Input
                      classNames={{
                        base: "grow",
                      }}
                      type="text"
                      variant="bordered"
                      isRequired
                      color="default"
                      placeholder="e.g. Alan Turing"
                    />
                  </LabelForm>

                  <LabelForm label='Quality' subTitle="Please select 'Slight background noise' in most cases, unless your audio has undergone professional sound processing." isRequired={true}>
                    <RadioGroup orientation="horizontal">
                      <Radio value="Original">
                      Slight background noise
                      </Radio>
                      <Radio value="Reprinting">
                      No background noise
                      </Radio>
                    </RadioGroup>
                  </LabelForm>
                  <div className="self-stretch h-[76px] flex-col justify-start items-start flex">
                    <div className="self-stretch py-2 justify-start items-center gap-2 inline-flex">
                      <Checkbox defaultSelected size="sm"></Checkbox>
                      <div className="grow shrink basis-0 text-zinc-400 text-sm font-normal font-['Inter'] leading-tight">I agree with the following information</div>
                    </div>
                    <div className="self-stretch px-6 justify-start items-start gap-2.5 inline-flex">
                      <div className="grow shrink basis-0"><span className="text-zinc-400 text-sm font-normal font-['Inter'] leading-tight">Only English, Mandarin, and Japanese are supported currently. Please follow us for future updates...</span><span className="text-zinc-400 text-sm font-semibold font-['Inter'] leading-tight">See more</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="lg"
                color="primary"
                variant="solid"
                className="w-full"
                endContent={
                  <div className="h-6 pl-1 pr-2 py-0.5 bg-green-500 rounded-md justify-center items-center gap-1 flex">
                    <FlashIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
                    <div className="text-center text-neutral-900 text-xs font-semibold font-['Inter']">
                      X 200
                    </div>
                  </div>
                }
              >Start Training</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default TrainVoiceModelModal;
