"use client";
import React from "react";
import DrawerModal from "../DrawerModal";
import { ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import VoiceAssetDetail from "./VoiceModelDetail";

function VoiceModelDetailDrawerModal({
  isOpen,
  publishId,
  onChange,
}: {
  isOpen: boolean;
  publishId: string | undefined;
  onChange?: (isOpen: boolean) => void;
}) {
  
  const voiceDetailModal = useDisclosure({
    onClose() {
      onChange && onChange(false);
    },
    isOpen: isOpen,
  });
  
  return (
    <DrawerModal
        modalDisclosure={voiceDetailModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                {publishId && <VoiceAssetDetail key={publishId} publishId={publishId} />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </DrawerModal>
  );
}

export default VoiceModelDetailDrawerModal;
