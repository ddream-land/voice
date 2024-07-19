"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, Button, Tab, Tabs } from "@nextui-org/react";
import ResetIcon from "@/app/icons/ResetIcon";
import { DefaultVoiceModelAdvancedParams, DefaultVoiceModelBasicParams, InstantGenerateParamsterType } from "@/app/lib/definitions.voice";
import VoiceParametersBasics from "../voice-parameters/VoiceParametersBasics";
import VoiceParametersAdvanced from "../voice-parameters/VoiceParametersAdvanced";

function MainStationControlParameters({
  isOpen = false,
  value,
  onChange,
} : {
  isOpen: boolean;
  value: InstantGenerateParamsterType;
  onChange: (newValue: InstantGenerateParamsterType) => void;
}) {
  const router = useRouter();
  const t = useTranslations();
  const [selected, setSelected] = useState("basics");
  const [isReset, setIsReset] = useState(false);

  const initSelectedKeys = new Set<string>([])
  if (isOpen) {
    initSelectedKeys.add("1")
  }
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>(initSelectedKeys))

  const handleReset = () => {
    setIsReset(true);
    onChange({
      ...value,
      basic_params: DefaultVoiceModelBasicParams,
      advance_params: DefaultVoiceModelAdvancedParams
    })
  };

  useEffect(() => {
    if(isReset) {
      setTimeout(() => {
        setIsReset(false);
      }, 1000)
    }
  }, [isReset])


  return (
    <div className="w-full px-6">
      <Accordion
       selectedKeys={selectedKeys}
       onSelectionChange={setSelectedKeys as any}
      >
        <AccordionItem
          key="1"
          aria-label="Parameters"
          title="Parameters"
          classNames={{
            base: "px-8 w-full bg-neutral-800/90 rounded-tl-2xl rounded-tr-2xl shadow backdrop-blur-[100px]",
            content: "pb-8"
          }}
        >
          <div className="self-stretch flex-col justify-end items-center gap-4 flex relative">
            <div className="absolute right-0 top-0">
              <Button
                variant="light"
                className="text-gray-500 text-sm font-semibold "
                startContent={<ResetIcon className={`h-5 w-5 text-current ${isReset && "-animate-spin"}`} />}
                onClick={handleReset}
              >
              Reset
              </Button> 
            </div>
            <Tabs
              aria-label="Options"     
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
              classNames={{
                panel: "p-0 w-full h-[190px]"
              }}
            >
              <Tab key="basics" title="Basics">
                <VoiceParametersBasics 
                  value={value.basic_params}
                  onChange={(newValue) => {
                    onChange({
                      ...value,
                      basic_params: newValue,
                    })
                  }}
                />
              </Tab>
              <Tab key="advanced" title="Advanced">
                <VoiceParametersAdvanced 
                  value={value.advance_params}
                  onChange={(newValue) => {
                    onChange({
                      ...value,
                      advance_params: newValue,
                    })
                  }}
                />
              </Tab>
            </Tabs>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default MainStationControlParameters;
