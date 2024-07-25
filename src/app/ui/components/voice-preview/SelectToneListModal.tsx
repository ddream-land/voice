"use client";
import React, { useState } from "react";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { VoiceModelToneType } from "@/app/lib/definitions.voice";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import ToneVoiceFile from "./ToneVoiceFile";
import { useTranslations } from "next-intl";

type opToneType = {
  tone: VoiceModelToneType,
  selected: boolean
}

function SelectToneListModal({
  toneList,
  onDone,
}: {
  toneList: Array<VoiceModelToneType>
  onDone?: (selectedTones: Array<VoiceModelToneType>)=>void
}) {
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const initOpToneList = () => {
    return toneList.map((toneItem) => {
      return {
        tone: toneItem,
        selected: false,
      };
    });
  }
  const [opToneList, setOpToneList] = useState<Array<opToneType>>(initOpToneList)
  
  return (
    <>
      <div className="w-full h-full relative" onClick={onOpen}>
        <div className="cursor-pointer w-full h-full p-4 rounded-2xl border-dashed border-2 border-zinc-700 flex-col justify-center items-center gap-2 inline-flex" >
        <PlusCircleIcon className="w-6 h-6 stroke-zinc-400" />
          <div className="text-center text-zinc-400 text-xs font-medium ">
            {t("PublishVoiceModel.selectToneListModalLabel")}
          </div>
        </div>
      </div>
      <Modal size='4xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t("PublishVoiceModel.selectToneListModalTitle")}</ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col gap-3">
                  {opToneList.map((toneItem, index) => (
                    <ToneVoiceFile
                      key={index}
                      hideCheckbox={false}
                      voiceSrc={toneItem.tone.audio_url}
                      text={toneItem.tone.text}
                      toneType={toneItem.tone.tone_type}
                      onTextChange={(newText) => {
                        setOpToneList(opToneList.map((toneListItem, toneIndex) => {
                          if (index === toneIndex) {
                            return {
                              ...toneListItem,
                              tone: {
                                ...toneListItem.tone,
                                text: newText,
                              }
                            }
                          }
                          return toneListItem;
                        }))
                      }}
                      onToneTypeChange={(newToneType) => {
                        setOpToneList(opToneList.map((toneListItem, toneIndex) => {
                          if (index === toneIndex) {
                            return {
                              ...toneListItem,
                              tone: {
                                ...toneListItem.tone,
                                tone_type: newToneType
                              }
                            }
                          }
                          return toneListItem;
                        }))
                      }}
                      onSelectionChange={(selected) => {
                        setOpToneList(opToneList.map((toneListItem, toneIndex) => {
                          if (index === toneIndex) {
                            return {
                              ...toneListItem,
                              selected: selected
                            }
                          }
                          return toneListItem;
                        }))
                      }}
                    />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="ghost" onPress={() => {
                  const selectedToneList = opToneList.filter((toneItem) => toneItem.selected).map((toneItem) => toneItem.tone);
                  if (selectedToneList.length === 0) {
                    amDispatch({
                      type: "add",
                      payload: {
                        type: "error",
                        message: t("PublishVoiceModel.formError.toneRequired")
                      },
                    })
                    return
                  }
                  onDone && onDone(selectedToneList);
                  onClose();
                }}>
                  {t("Button.add")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectToneListModal;
