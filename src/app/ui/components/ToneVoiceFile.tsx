"use client";
import React, { useState } from "react";
import VoicePreview from "./VoicePreview";
import { Checkbox, cn, Input, Select, SelectItem } from "@nextui-org/react";
import { TypeTone } from "@/app/lib/definitions.tone";
import { TrashIcon } from "@heroicons/react/24/outline";


function ToneVoiceFile({
  voiceSrc,
  hideTrash=true,
  hideCheckbox=true,
  isDisabled=false,
  selected=false,
}: {
  voiceSrc: string
  hideTrash?: boolean
  hideCheckbox?: boolean
  isDisabled?: boolean
  selected?: boolean
}) {
  const [isSelected, setIsSelected] = useState(selected);

  const [tone, setTone] = useState<TypeTone>({
    value: "1",
    name: "1"
  });

  const toneList:Array<TypeTone> = [{
    value: "1",
    name: "1",
  }, {
    value: "2",
    name: "2",
  }, {
    value: "3",
    name: "3",
  }, {
    value: "4",
    name: "5",
  }]

  return (
    <div className={cn([isDisabled ? "opacity-30": "", isSelected ? "border-2  border-blue-600 p-[14px]" : "p-4", "relative self-stretch bg-zinc-600 rounded-xl justify-start items-center gap-4 inline-flex"])}>
      {isDisabled && (<div className="w-full h-full absolute top-0 left-0 z-10" />)}
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch justify-start items-start gap-3 inline-flex">
          <VoicePreview voiceSrc={voiceSrc} hideTimeline={true} classNames={{playButton: 'h-10 w-10'}} />
        </div>
        <div className="self-stretch justify-between items-start gap-3 inline-flex">
          <div className="w-[120px] h-full">
            <Select
              variant="flat"
              size="md"
              placeholder="Select an tone"
              selectedKeys={[tone.value]}
              classNames={{
                // trigger: 'bg-zinc-700'
              }}
              onChange={(e) => {
                setTone({
                  name: e.target.value,
                  value: e.target.value
                });
              }}
            >
              {toneList.map((tone) => (
                  <SelectItem
                    key={tone.value}
                    value={tone.value}
                    classNames={{
                      base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
                    }}
                  >
                    {tone.name}
                  </SelectItem>
              ))}
          </Select>
          </div>
					<Input classNames={{
						base: 'grow',
            // inputWrapper: 'bg-zinc-700'
					}} type="text" variant="flat" color="default" placeholder="With Error Message" />
        </div>
      </div>
      {(!hideTrash || !hideCheckbox) && (
        <div className="flex items-center h-full cursor-pointer flex-col gap-4 justify-center">
          {!hideTrash && (<TrashIcon className="w-5 h-5 fill-zinc-500" />)}
          {!hideCheckbox && (
            <Checkbox
              isDisabled={isDisabled}
              size="sm"
              className="w-5 h-5 fill-zinc-500"
              aria-label='checked'
              classNames={{
                base: "p-0",
                icon: "m-0",
                wrapper: "m-0",
                label: "m-0"
              }}
              isSelected={isSelected}
              onValueChange={(selected) => {
                setIsSelected(selected)
              }}
            ></Checkbox>
          )}
        </div>
      )}
    </div>
  );
}

export default ToneVoiceFile;
