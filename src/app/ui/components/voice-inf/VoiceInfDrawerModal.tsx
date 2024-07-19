"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import MainStationControl from "./MainStationControl";
import { InfType, VoiceInfHistoryType, VoiceModelToneType } from "@/app/lib/definitions.voice";

function VoiceInfDrawerModal({
  isOpen,
  publishId = "",
  modelId = "",
  tones = [],
  onChange,
  onSuccess,
  onSendingChange,
}: {
  isOpen: boolean;
  publishId: string;
  modelId: string;
  tones: VoiceModelToneType[];
  onChange?: (isOpen: boolean) => void;
  onSuccess?: (newInf: VoiceInfHistoryType) => void;
  onSendingChange?: ({sending, infType} : {sending: boolean, infType: InfType}) => void
}) {
  
  return (
    <Modal
      size="full"
      placement="bottom"
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        onChange && onChange(isOpen);
      }}
      classNames={{
        wrapper: "w-full",
        base: "bg-transparent w-full h-auto",
        header: "hidden shadow-none",
        body: "bg-transparent p-0 justify-end w-full h-auto",
        footer: "hidden",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              opacity: {
                duration: 0.15,
              },
            },
          },
          exit: {
            y: "50%",
            opacity: 0,
            transition: {
              opacity: {
                duration: 0.1,
              },
            },
          },
        },
      }}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              {publishId && (
                <div className="pr-[382px] w-full">
                  <MainStationControl
                    key={publishId}
                    publishId={publishId}
                    modelId={modelId}
                    tones={tones}
                    onSuccess={(newInf) => {
                      onSuccess && onSuccess(newInf);
                      onChange && onChange(false);
                    }}
                    onSendingChange={onSendingChange}
                  />
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default VoiceInfDrawerModal;
