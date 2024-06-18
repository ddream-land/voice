"use client";
import React, { useState } from "react";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import VoiceAssetDetail from "./VoiceModelDetail";
import DrawerModal from "../components/DrawerModal";

function VoiceAsse() {

  const voiceDetailModal = useDisclosure();

  return (
    <div className="w-full h-screen pt-14 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <div className="fixed top-14 left-0 w-full z-40">
          <VoiceModelListHeader />
        </div>
        <div className="self-stretch pt-[170px] overflow-hidden w-full">
          <VoiceModelList onItemClick={() => {
            voiceDetailModal.onOpen();
          }} />
        </div>
      </div>

      <DrawerModal
        modalDisclosure={voiceDetailModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <VoiceAssetDetail />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </DrawerModal>
    </div>
  );
}

export default VoiceAsse;
