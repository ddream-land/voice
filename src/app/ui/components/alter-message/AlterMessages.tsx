"use client";
import React, { useEffect, useState } from "react";
import { cn, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export type messageType = {
  message: string,
  title?: string,
  type?: "info" | "success" | "error" | "warning",
}

export type AlterMessagesProps = {
  messages: Array<messageType>,
  isOpen?: boolean,
  onClose: () => void
}

function AlterMessages({
  messages,
  isOpen = false,
  onClose
}: AlterMessagesProps) {
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
        wrapper: "my-20",
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
                  <div
                    key={index}
                    className={cn(
                      msg.type === "info" ? 'bg-sky-800/90 border-sky-800' : '',
                      msg.type === "success"? 'bg-emerald-700/90 border-emerald-700' : '',
                      (msg.type === "error" || msg.type === undefined) ? 'bg-red-950/90 border-rose-900' : '',
                      msg.type === "warning" ? 'bg-yellow-950/90 border-yellow-700' : '',
                      ' p-4 rounded-lg shadow border justify-start items-start gap-3 inline-flex'
                    )}
                  >
                      <div className="w-6 h-6 justify-center items-center flex">
                          <ExclamationCircleIcon
                            className={cn(
                              msg.type === "info" ? 'fill-cyan-500' : '',
                              msg.type === "success" ? 'fill-emerald-500' : '',
                              (msg.type === "error" || msg.type === undefined) ? 'fill-rose-600' : '',
                              msg.type === "warning" ? 'fill-amber-500' : '',
                              ' w-6 h-6'
                            )}
                          />
                      </div>
                      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="self-stretch justify-start items-start gap-2 inline-flex">
                              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                  { msg.title && (<div className="text-white text-base font-medium leading-normal">{msg.title}</div>)}
                                  <div className="pt-1 self-stretch text-white text-sm font-normal leading-tight">{msg.message}</div>
                              </div>
                              <div className="justify-start items-center gap-1 flex">
                                  <div className="w-4 h-4 relative" />
                              </div>
                          </div>
                      </div>
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
