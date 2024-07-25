"use client";
import React, { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";
import { useTranslations } from "next-intl";

type TypeFilterItem = {
  label: string;
  value: string;
};

function VoiceListHeader({
  filters= {
    type: "",
    name: "",
  },
  onChange
}: {
  filters: VoiceModelFilterType,
  onChange: (newFilters: VoiceModelFilterType) => void
}) {
  const t = useTranslations();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  const types: Array<TypeFilterItem> = [{
    label: t("VoiceType.all"),
    value: "",
  }, {
    label: t("VoiceType.girl"),
    value: "girl",
  }, {
    label: t("VoiceType.boy"),
    value: "boy",
  }, {
    label: t("VoiceType.male"),
    value: "male",
  }, {
    label: t("VoiceType.female"),
    value: "female",
  }] 

  return (
    <div className="self-stretch justify-between items-center flex flex-col bg-neutral-900 px-8 pt-6 w-full">
      <div className="h-[40px] justify-between items-center gap-6 flex w-full">
        <div className="text-white text-xl font-semibold leading-normal">
        {t("PublishedVoices.title")}
        </div>
        <div className="justify-start items-center gap-2.5 flex">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                size="lg"
                variant="bordered" 
                className="w-[200px] justify-between"
                endContent={<ChevronDownIcon className="h-4 w-4" />}
              >
                {t("Button.publish")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Action event example" 
              onAction={(key) => {
                if (key === 'local') {
                  setUploadModalOpen(true);
                }
                if (key === 'online') {
                  setSelectModalOpen(true);
                }
              }}
            >
            <DropdownItem key="local">{t("VoiceAsset.publishFormLocal")}</DropdownItem>
            <DropdownItem key="online">{t("VoiceAsset.publishFormMyVoiceLib")}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

        <PublishVoiceModelModal
          key={'uploadModalOpen' + uploadModalOpen.toString()}
          variant="UPLOAD"
          isOpen={uploadModalOpen}
          onChange={(isOpen) => {setUploadModalOpen(isOpen)}}
          onSuccess={() => {
            onChange && onChange(filters);
            setUploadModalOpen(false);
          }}
        />
        <PublishVoiceModelModal
          key={'selectModalOpen'+ selectModalOpen.toString()}
          variant="SELECT"
          isOpen={selectModalOpen}
          onChange={(isOpen) => {setSelectModalOpen(isOpen)}}
          onSuccess={() => {
            onChange && onChange(filters);
            setSelectModalOpen(false);
          }}
        />
    </div>
  );
}

export default VoiceListHeader;
