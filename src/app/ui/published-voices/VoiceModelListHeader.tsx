"use client";
import React, { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import NuwaChipRadioGroup from "../components/NuwaChipRadioGroup";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FilterIcon from "@/app/icons/FilterIcon";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";
import { useRouter } from "@/navigation";

type TypeFilterItem = {
  label: string;
  value: string;
};

const types: Array<TypeFilterItem> = [{
  label: "All",
  value: "",
}, {
  label: "Girl",
  value: "gril",
}, {
  label: "Boy",
  value: "boy",
}, {
  label: "Male",
  value: "male",
}, {
  label: "Female",
  value: "female",
}] 


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
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <div className="self-stretch justify-between items-center flex flex-col bg-neutral-900 px-8 pt-6 w-full">
      <div className="h-[40px] justify-between items-center gap-6 flex w-full">
        <div className="text-white text-xl font-semibold leading-normal">
          Voices
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
                Publish
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
              <DropdownItem key="local">From Local</DropdownItem>
              <DropdownItem key="online">From My Voice Lib</DropdownItem>
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
