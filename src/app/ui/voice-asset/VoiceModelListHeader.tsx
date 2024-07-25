"use client";
import React, { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import NuwaChipRadioGroup from "../components/NuwaChipRadioGroup";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";
import { useRouter } from "@/navigation";
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
  const router = useRouter();
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
        <Input
          size="sm"
          classNames={{
            base: 'max-w-[400px] min-w-[200px]',
            inputWrapper: 'h-10'
          }}
          type="text"
          variant="bordered"
          placeholder={t("VoiceAsset.searchPlaceholder")}
          startContent={<MagnifyingGlassIcon className="w-6 h-6 fill-zinc-400" />}
          value={filters.name || ""}
          onChange={(e: any) => {
            onChange({
              ...filters,
              name: e.target.value
            })
          }}
        />
        <div className="grow shrink-0 justify-start items-center gap-2.5 flex">
          <NuwaChipRadioGroup
            items={types}
            value={filters.type}
            onChange={(e: any) => {
              onChange({
                ...filters,
                type: e ? e.target.value : null
              })
            }}
          />
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
                {t("VoiceAsset.publish")}
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
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            className="w-[200px]"
            startContent={<DCubeIcon className="h-6 w-6 fill-primary group-hover:fill-white" />}
            onPress={() => {
              router.push('/myvoicemodels');
            }}
          >{t("VoiceAsset.trainMyVoiceBtn")}</Button>
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
