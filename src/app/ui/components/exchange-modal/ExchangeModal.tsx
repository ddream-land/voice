"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { InfType, VoiceInfHistoryType, VoiceModelToneType } from "@/app/lib/definitions.voice";
import ExchangeList from "./ExchangeList";


export type ExchangeModalProps = {
  isOpen?: boolean
  locale?: 'en' | 'zh-CN'
  onClose?: () => void
  onChange?: (isOpen: boolean) => void
  onSuccess?: () => void
}

function ExchangeModal({
  isOpen,
  locale = 'en',
  onClose,
  onChange,
  onSuccess,
}: ExchangeModalProps) {
  
  return (
    <Modal
      size="5xl"
      placement="center"
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose && onClose();
        }
        onChange && onChange(isOpen);
      }}
      classNames={{
        wrapper: "w-full",
        base: "bg-transparent w-full h-auto",
        header: "hidden shadow-none",
        body: "bg-transparent p-0 justify-end w-full h-auto bg-black rounded-3xl border border-zinc-800 h-[610px]",
        footer: "hidden",
      }}
      hideCloseButton={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <ExchangeList />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ExchangeModal;
