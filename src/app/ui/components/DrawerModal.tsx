"use client";
import React, { useState, ReactNode } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export type TypeModalDisclosure = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

function DrawerModal({
  children,
  modalDisclosure,
}: {
  children: ReactNode,
  modalDisclosure: TypeModalDisclosure
}) {

  return (
    <Modal 
      size="full"
      isOpen={modalDisclosure.isOpen}
      placement={'bottom'}
      scrollBehavior="inside"
      onOpenChange={modalDisclosure.onOpenChange}
      classNames={{
        base: "h-11/12 rounded-t-lg overflow-hidden bg-transparent shadow-none h-full",
        header: "rounded-t-lg overflow-hidden bg-transparent h-16",
        body: "bg-zinc-900 rounded-tl-2xl rounded-tr-2xl px-[120px] border-[#898989] border-t border-solid",
        footer: "bg-zinc-900 rounded-bl-xl rounded-br-xl px-[120px]",
      }}
      closeButton={<div><XMarkIcon className="w-10 h-10 fill-zinc-400" /></div>}
      hideCloseButton={false}
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
    >
      {children}
    </Modal>
  );
}

export default DrawerModal;
