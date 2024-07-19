"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

function PublishResultModal({
  isOpen = false,
  variant = 'SUCCESS',
  onChange = () => {},
}: {
  isOpen: boolean
  variant?: 'SUCCESS'
  onChange: (isOpen: boolean) => void // 类型定义为函数，用于处理模态框的打开和关闭
}) {
  const resultModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });


  return (
    <Modal 
      size="lg"
      isOpen={resultModal.isOpen}
      scrollBehavior="inside"
      onOpenChange={resultModal.onOpenChange}
      classNames={{
        base: "",
        header: "",
        body: "",
        footer: "",
      }}
      hideCloseButton={true}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="w-full h-[188px] py-8 bg-neutral-900 rounded-2xl flex-col justify-start items-center gap-6 inline-flex">
                <div className="flex-col justify-start items-center gap-8 flex">
                  <div className="flex-col justify-start items-center gap-1 flex">
                    <div className="text-center text-white text-xl font-semibold leading-7">Published Successfully!</div>
                    <div className="text-center text-zinc-400 text-sm font-normal leading-tight">Click confirm to return to the 'published voices' page</div>
                  </div>
                  <Button
                    color="primary"
                    variant="bordered"
                    size="lg"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default PublishResultModal;
