"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";


function AlterMessages({messages, isOpen = false, onClose}: {messages: string[], isOpen?: boolean, onClose: () => void }) {
  const t = useTranslations();

  const msgModal = useDisclosure();
  useEffect(() => {
    if (messages.length > 0) {
      msgModal.onOpen();
      setTimeout(() => {
        onClose();
        msgModal.onClose();
      }, 3000)
    } else {
      msgModal.onClose();
    }
  }, [messages])
  return ( 
    <Modal
      placement={"top"}
      backdrop="transparent"
      isOpen={msgModal.isOpen}
      onClose={onClose}
      hideCloseButton={true}
      classNames={{
        body: "",
        base: "bg-transparent shadow-none",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="flex flex-col gap-3">
                {messages.map((msg, index) => (
                  <div key={index} className="text-center w-full h-14 px-4 bg-gray-800 rounded-[20px] flex justify-center items-center">
                    <div className="text-white text-sm font-bold">{msg}</div>
                  </div>
                ))}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AlterMessages;
