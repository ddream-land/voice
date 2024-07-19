"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { InfType, VoiceInfHistoryType, VoiceModelToneType } from "@/app/lib/definitions.voice";
import ExchangeList from "./ExchangeList";
import { useExchangeDispatch } from "./ExchangeContextProvider";
import { getFinanceBags } from "@/app/lib/finance.api";


export type ExchangeModalProps = {
  value?: number,
  regetCount: number,
  isOpen?: boolean
  locale?: 'en' | 'zh-CN'
  onClose?: () => void
  onChange?: (isOpen: boolean) => void
  onSuccess?: () => void
}

function ExchangeModal({
  value = 0,
  regetCount = 0,
  isOpen,
  locale = 'en',
  onClose,
  onChange,
  onSuccess,
}: ExchangeModalProps) {


  const exchangeDispatch = useExchangeDispatch();

  const [isGetFinanceBagsing, setIsGetFianceBagsing] = useState(false)
  const getFinanceBagsApi = getFinanceBags()
  const getBagsApiServer = async () => {
    if (isGetFinanceBagsing) return
    setIsGetFianceBagsing(true)
    const res = await getFinanceBagsApi.send({});
    if (res && res.code === 0) {
      if (res.data && res.data['101']) {
        // setExchangeBags(res.data['101'])
        exchangeDispatch({
          type: 'set',
          payload: res.data['101']
        })
      }
    }

    setIsGetFianceBagsing(false)
  }

  useEffect(() => {
    getBagsApiServer();
  }, [regetCount])
  
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
        {() => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <ExchangeList onSuccess={() => {
                onSuccess && onSuccess();
                onClose && onClose();
              }} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ExchangeModal;
