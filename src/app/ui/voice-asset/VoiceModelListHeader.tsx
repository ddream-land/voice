"use client";
import React, { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import NuwaChipRadioGroup from "../components/NuwaChipRadioGroup";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FilterIcon from "@/app/icons/FilterIcon";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";

type TypeFilterItem = {
  label: string;
  value: string;
};


function VoiceListHeader() {
  const [selectedFilter, setSelectedFilter] = useState<TypeFilterItem | null>();
  const [filters, setFilters] = useState<Array<TypeFilterItem>>([{
    label: "Girl-12",
    value: "gril",
  }, {
    label: "Boy-23",
    value: "boy",
  }, {
    label: "Male-23",
    value: "male",
  }, {
    label: "Female-23",
    value: "female",
  }]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <div className="self-stretch justify-between items-center flex flex-col bg-neutral-900 px-8 pt-10 w-full">
      <div className="h-[40px] justify-between items-center gap-6 flex w-full mb-4">
        <div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">
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
          <Button size="lg" variant="flat" className="w-[200px]" startContent={<DCubeIcon className="h-6 w-6 fill-zinc-400" />}>Train My Voice</Button>
        </div>
      </div>

      <div className="justify-start items-center gap-6 flex w-full">
        <Input size="sm" className="w-[400px]" type="text" variant="bordered" placeholder="Search" startContent={<MagnifyingGlassIcon className="w-6 h-6 fill-zinc-400" />} />
        <div className="grow justify-start items-center gap-2.5 flex">
          <NuwaChipRadioGroup
            items={filters}
            value={selectedFilter}
            onChange={(e: any) => {
              if (e) {
                setSelectedFilter(e.target.value)
              } else {
                setSelectedFilter(null)
              }
            }}
          />
        </div>
        <Button size="lg" className="text-zinc-400" variant="light" endContent={<FilterIcon className="w-6 h-6 fill-zinc-500" />}>Filters</Button>
      </div>
      <PublishVoiceModelModal isOpen={uploadModalOpen} onChange={(isOpen) => {setUploadModalOpen(isOpen)}} variant="ONLINE"  />
      <PublishVoiceModelModal isOpen={selectModalOpen} onChange={(isOpen) => {setSelectModalOpen(isOpen)}} variant="LOCAL" />
    </div>
  );
}

export default VoiceListHeader;
