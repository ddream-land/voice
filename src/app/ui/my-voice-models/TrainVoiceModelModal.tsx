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
  useDisclosure,
} from "@nextui-org/react";
import UploadFile from "../components/upload-file/UploadFile";
import BDocumentIcon from "@/app/icons/BDocumentIcon";
import LabelForm from "../components/form/LabelForm";
import WholeNoteIcon from "@/app/icons/WholeNoteIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TrainVoiceFilePreview from "../components/voice-preview/TrainVoiceFilePreview";
import { createVoiceTrain } from "@/app/lib/voice.api";
import { z } from "zod";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import { handleConfetti } from "@/app/lib/utils";
import { useExchangeDispatch } from "../components/exchange-modal/ExchangeContextProvider";
import { useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

function TrainVoiceModelModal({
  isOpen = false,
  onChange = () => {},
  onDone= () => {},
}: {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void; // 类型定义为函数，用于处理模态框的打开和关闭
  onDone?: () => void; // 类型定义为函数，用于处理模态框的完成
}) {
  const t = useTranslations();

  const [sending, setSending] = useState(false);

  const trainVoiceModelModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

  const [ voiceSrc, setVoiceSrc ] = useState<string | null>(null);
  const [ voiceFile, setVoiceFile ] = useState<File | null>(null);
  const [ taskName, setTaskName ] = useState<string>("")
  const [ isAgree, setIsAgree] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const amDispatch = useAmDispatch();
  const exchangeDispatch = useExchangeDispatch();

  const createVoiceTrainApi = createVoiceTrain();
  
  const createVoiceTrainServer = async () => {

    if (sending) {
      return;
    }
    if (voiceSrc === null || voiceFile === null) {
      return
    }
    setSending(true);


    const formData = new FormData(); 
    formData.append('file', voiceFile);
    formData.append('task_name', taskName); 
    const res = await createVoiceTrainApi.send(formData);
    if (res && res.code === 0) {
      onDone();
      trainVoiceModelModal.onClose();
      handleConfetti()
      exchangeDispatch({
        type: 'reget',
      })
    }

    setSending(false);
  };

  const FormSchema = z.object({
    file: z.string({
      required_error: t("TrainVoiceModelModal.soundFileIsRequired"),
      invalid_type_error: t("TrainVoiceModelModal.soundFileIsRequired"),
    }).url({message: t("TrainVoiceModelModal.soundFileIsRequired")}), 
    task_name: z.string({
      required_error: t("TrainVoiceModelModal.taskNameIsRequired"),
      invalid_type_error: t("TrainVoiceModelModal.taskNameIsRequired"),
    }).min(1, { message: t("TrainVoiceModelModal.taskNameIsRequired") }),
  });

  const submitHandler = async () => {
    if(isLoading) {
      return;
    }
    setIsLoading(true);
    const validatedFields = FormSchema.required().safeParse({
      file: voiceSrc, 
      task_name: taskName,
    });
  
    if (validatedFields.success) {
      createVoiceTrainServer();
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
    setIsLoading(false);
  }

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
                <div className="text-white text-2xl font-bold leading-loose">{t("TrainVoiceModelModal.headerTitle")}</div>
                <div className="self-stretch"><span className="text-white text-sm font-normal leading-tight">{t("TrainVoiceModelModal.headerDescription")}</span><span className="text-blue-600 text-sm font-normal leading-tight"> </span><a href={t("TrainVoiceModelModal.learnMoreLink")} target="_blank" className="text-blue-600 text-sm font-semibold leading-tight">{t("TrainVoiceModelModal.learnMore")}{' >'}</a></div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="w-full bg-zinc-900 rounded-2xl shadow flex-col justify-start items-start gap-8 inline-flex">
                <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                  { !voiceSrc && (
                    <div className="self-stretch h-40">
                      <UploadFile
                        label={
                          <div className="flex-col justify-center items-center gap-2.5 flex">
                            <div className="text-white text-sm font-semibold leading-tight">{t("TrainVoiceModelModal.uploadFileLabel1")}</div>
                            <div className="w-[405px] text-center text-zinc-400 text-xs font-medium ">{t("TrainVoiceModelModal.uploadFileLabel2")}</div>
                          </div>
                        }
                        icon={<BDocumentIcon className='h-6 w-6' />}
                        accept="audio"
                        onDone={(result) => {
                          setVoiceSrc(result.url);
                          setVoiceFile(result.file);
                        }}
                        >
                      </UploadFile>
                    </div>
                  )}
                  
                  { voiceSrc && (
                    <TrainVoiceFilePreview voiceSrc={voiceSrc} onTrashClick={() => setVoiceSrc(null)} />
                  )}
                  
                  {/* <TrainVoiceFilePreview voiceSrc={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} onTrashClick={() => setVoiceSrc(null)} /> */}

                  <LabelForm label={t("TrainVoiceModelModal.taskNameLabel")} isRequired={true}>
                    <Input
                      classNames={{
                        base: "grow",
                      }}
                      type="text"
                      variant="bordered"
                      isRequired
                      color="default"
                      placeholder={t("TrainVoiceModelModal.taskNamePlaceholder")} 
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </LabelForm>

                  {/* <LabelForm label='Quality' subTitle="Please select 'Slight background noise' in most cases, unless your audio has undergone professional sound processing." isRequired={true}>
                    <RadioGroup orientation="horizontal">
                      <Radio value="Original">
                      Slight background noise
                      </Radio>
                      <Radio value="Reprinting">
                      No background noise
                      </Radio>
                    </RadioGroup>
                  </LabelForm> */}
                  <div className="self-stretch flex-col justify-start items-start flex">
                    <div className="self-stretch py-2 justify-start items-center gap-2 inline-flex">
                      <Checkbox isSelected={isAgree} onValueChange={setIsAgree} size="sm"></Checkbox>
                      <div className="grow shrink basis-0 text-zinc-400 text-sm font-normal leading-tight">{t("TrainVoiceModelModal.agree")}</div>
                    </div>
                    <div className="self-stretch px-12 justify-start items-start inline-flex">
                      <ul className="w-full list-disc">
                        <li className="text-zinc-400 text-sm font-normal leading-tight">{t("TrainVoiceModelModal.agreeRule1")}</li>
                        <li className="text-zinc-400 text-sm font-normal leading-tight">{t("TrainVoiceModelModal.agreeRule2")}</li>
                        <li className="text-zinc-400 text-sm font-normal leading-tight">{t("TrainVoiceModelModal.agreeRule3")}</li>
                        <li className="text-zinc-400 text-sm font-normal leading-tight">{t("TrainVoiceModelModal.agreeRule4")}</li>
                      </ul>
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
                    <WholeNoteIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
                    <div className="text-center text-neutral-900 text-xs font-semibold ">
                      X 650
                    </div>
                  </div>
                }
                isDisabled={!isAgree || sending || voiceSrc === null}
                isLoading={sending}
                onPress={() => {
                  submitHandler();
                }}
              >{t("TrainVoiceModelModal.startTrainingBtn")}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default TrainVoiceModelModal;
