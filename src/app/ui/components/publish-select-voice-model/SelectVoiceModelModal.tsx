"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ToneVoiceFile from "../voice-preview/ToneVoiceFile";
import { XMarkIcon } from "@heroicons/react/24/outline";

function SelectVoiceModelModal({
  isOpen = false,
  onChange = () => {},
}: {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void; // 类型定义为函数，用于处理模态框的打开和关闭
}) {

  const selectModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

  return (
      <Modal 
        size="4xl"
        isOpen={selectModal.isOpen}
        placement={'center'}
        scrollBehavior="inside"
        onOpenChange={selectModal.onOpenChange}
        closeButton={<div><XMarkIcon className="w-10 h-10 fill-zinc-400" /></div>}
        hideCloseButton={false}
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="text-white text-2xl font-bold leading-loose">Select Model</div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <ToneVoiceFile voiceSrc={"voiceSrc"} hideCheckbox={false} />
                <ToneVoiceFile voiceSrc={"voiceSrc"} hideCheckbox={false} isDisabled={true} />
                <ToneVoiceFile voiceSrc={"voiceSrc"} hideCheckbox={false} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button size="lg" color="primary" variant="solid">Add</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SelectVoiceModelModal;
