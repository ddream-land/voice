"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import VoiceModelListHeader from "./VoiceModelListHeader";
import { InfType, VoiceModelType, VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";
import { cn } from "@nextui-org/react";
import VoiceInfDrawerModal from "../components/voice-inf/VoiceInfDrawerModal";
import { useSearchParams } from "next/navigation";
import { getPublishSquare } from "@/app/lib/voice.api";
import dynamic from "next/dynamic";
const VoiceModelList = dynamic(() => import('../components/voice-model-list/VoiceModelList'), { ssr: false })


function MainStation({
  onInfSuccess,
  onSendingChange
}: {
  onInfSuccess: (newInf: VoiceInfHistoryType) => void
  onSendingChange?: ({sending, infType} : {sending: boolean, infType: InfType}) => void
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const searchParams = useSearchParams()
  const searchPublishId = searchParams.get('publishId') || ''

  const [selectedVoiceModel, setSelectedVoiceModel] = useState<VoiceModelType | null >(null);

  const [filters, setFilters] = useState<VoiceModelFilterType>({
    type: "browse",
    name: ""
  })

  const [voiceModelListKey, setVoiceModelListKey] = useState(0);

  const getVoiceModelListApi = getPublishSquare();

  const getPublishSquareToServer = async () => {
    const res = await getVoiceModelListApi.send({
      page_token: '',
      size: 20,
      type: 'browse',
      name: ''
    });
    if (res && res.code === 0) {
      let newVoiceModelList: VoiceModelType[] = res.data.list;
      let selectNewVoiceModelItem = newVoiceModelList.find(voiceModel => voiceModel.publish_id === searchPublishId)
      if (selectNewVoiceModelItem) {
        setSelectedVoiceModel(selectNewVoiceModelItem);
        setIsOpen(true);
      }
    }
  };

  useEffect(() => {
    if (searchPublishId) {
      getPublishSquareToServer();
    }
  }, [])

  return (
    <div className="grow shrink basis-0 self-stretch rounded-bl-[20px] border-r border-neutral-800 flex-col justify-between items-center inline-flex">
      <div className="fixed top-20 left-0 pr-[382px] w-full z-40">
        <VoiceModelListHeader
          filters={filters}
          onChange={(newFilters) => {
            setFilters(newFilters)
            setVoiceModelListKey(voiceModelListKey + 1)
          }}
        />
      </div>
      <div className={cn('self-stretch pt-[112px] overflow-hidden', selectedVoiceModel ? 'h-[calc(100vh-112px)]' : 'h-[calc(100vh-112px)]')}>
        <VoiceModelList
          key={voiceModelListKey}
          type="workstation"
          selectedVoiceModel={selectedVoiceModel}
          onItemClick={(voiceModel) => {
            setSelectedVoiceModel(voiceModel);
            setIsOpen(true);
            // voiceDetailModal.onOpen();
          }}
          onChange={(voiceList) => {
            if (voiceList.length === 0) {
              setIsEmpty(true);
            } else {
              setIsEmpty(false);
            }
          }}
          filters={filters}
        />
      </div>

      <div className="fixed bottom-0 left-0 pr-[382px] w-full">
        {selectedVoiceModel && (
          <VoiceInfDrawerModal
            isOpen={isOpen}
            key={selectedVoiceModel?.publish_id}
            publishId={selectedVoiceModel?.publish_id || ''}
            modelId={selectedVoiceModel?.model_id || ""}
            tones={selectedVoiceModel?.tone || []}
            onSuccess={(newInf: VoiceInfHistoryType) => {
              onInfSuccess(newInf);
            }}
            onChange={(isOpen) => {
              setIsOpen(isOpen);
              if (!isOpen) {
                setSelectedVoiceModel(null);
              }
            }}
            onSendingChange={onSendingChange}
          />
        )}
      </div>
    </div>
  );
}

export default MainStation;
