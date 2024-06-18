"use client";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  cn,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import {
  DefaultInstantGenerateParamster,
  TypeInstantGenerateParamster,
} from "@/app/lib/definitions.InstantGenerateParamster";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import UploadFile from "../UploadFile";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";
import TagsInput from "../TagsInput";

function VoiceInformationForm({}: {}) {
  const [parameters, setParameters] = useState<TypeInstantGenerateParamster>(
    DefaultInstantGenerateParamster
  );

  const languageList = [
    {
      value: "GPT-Sovits",
      label: "GPT-Sovits",
    },
    {
      value: "zh",
      label: "GPT-Sovits",
    },
    {
      value: "ja",
      label: "GPT-Sovits",
    },
  ];

  const [type, setType] = useState<string>("GPT-Sovits");
  const [source, setSource] = useState("Original");
  const [downloadPermissions, setDownloadPermissions] = useState("FreeDownload");
  const [permissions, setPermissions] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (!permissions.includes('download-allowed') && permissions.includes('permission-change-allowed')) {
      let newPermissions = [...permissions];
      delete newPermissions[permissions.indexOf('permission-change-allowed')];
      setPermissions(newPermissions);
    }
  }, [permissions])

  return (
    <>
      <div className="w-full px-8 py-16 flex-col justify-start items-end gap-12 inline-flex">
        <div className="w-full flex-col justify-start items-start gap-12 flex">
          <TitleModal title="Voice Information" />
          <div className="self-stretch flex-col justify-start items-start gap-8 flex">
            <LabelForm label="Cover" isRequired={true}>
              <div className="w-full h-[136px]">
                <UploadFile
                  label="Drag and drop files here or click to upload"
                  onClick={() => {}}
                  icon={<PlusCircleIcon className="w-6 h-6 stroke-zinc-400" />}
                ></UploadFile>
              </div>
            </LabelForm>
            <LabelForm label="Name" isRequired={true}>
              <Input
                classNames={{
                  base: "grow",
                  // inputWrapper: 'bg-zinc-700'
                }}
                type="text"
                variant="bordered"
                isRequired
                color="default"
                placeholder="Email"
              />
            </LabelForm>
            <LabelForm label="Type" isRequired={true}>
              <Select
                variant="bordered"
                size="md"
                isRequired
                placeholder="Select an language"
                selectedKeys={[type]}
                onChange={(e) => setType(e.target.value)}
              >
                {languageList.map((Language) => (
                  <SelectItem
                    key={Language.value}
                    value={Language.value}
                    classNames={{
                      base: "h-12 pl-2 pr-3 py-2 rounded-xl gap-4",
                    }}
                  >
                    {Language.label}
                  </SelectItem>
                ))}
              </Select>
            </LabelForm>

            <LabelForm label="Tag" isRequired={false}>
              <TagsInput value={tags} onValueChange={setTags}/>
            </LabelForm>

            <LabelForm label="Description" isRequired={false}>
              <Textarea
                classNames={{
                  base: "grow",
                  // inputWrapper: 'bg-zinc-700'
                }}
                type="text"
                variant="bordered"
                isRequired
                color="default"
                placeholder="Email"
              />
            </LabelForm>

            <LabelForm label="Source" isRequired={true}>
              <div className="w-full flex flex-row gap-3 items-end">
                <RadioGroup value={source} onValueChange={setSource}>
                  <Radio value="Original" classNames={{ base: "py-6" }}>
                    Original
                  </Radio>
                  <Radio value="Reprinting" classNames={{ base: "py-6" }}>
                    Reprinting
                  </Radio>
                </RadioGroup>
                {source === "Reprinting" && (
                  <Input
                    type="text"
                    size="md"
                    variant="bordered"
                    isRequired
                    color="default"
                    placeholder="Email"
                  />
                )}
              </div>
            </LabelForm>

            <LabelForm label="Model download permissions" isRequired={true}>
              <RadioGroup
                value={downloadPermissions}
                onValueChange={setDownloadPermissions}
              >
                <Radio value="FreeDownload">Free download</Radio>
                <Radio value="DoNotAllowDownloads">Do not allow downloads</Radio>
              </RadioGroup>
            </LabelForm>

            <LabelForm label="Permissions" isRequired={true}>
              <CheckboxGroup
                value={permissions}
                onValueChange={setPermissions}
                defaultValue={[]}
              >
                <Checkbox value="credit-free">Credit Free</Checkbox>
                <Checkbox value="reprint-allowed">Reprint Allowed</Checkbox>
                <Checkbox value="download-allowed">Download Allowed</Checkbox>
                <Checkbox value="permission-change-allowed" classNames={{ base: 'pl-10'}} isDisabled={(() => {
                  return !permissions.includes('download-allowed');
                })()}>Permission Change Allowed</Checkbox>
              </CheckboxGroup>
              
            </LabelForm>

            <LabelForm label="Commercial license" isRequired={true}>
              <RadioGroup
                value={downloadPermissions}
                onValueChange={setDownloadPermissions}
              >
                <Radio value="FreeDownload">Commercial Use Allowed</Radio>
                <Radio value="DoNotAllowDownloads">Commercial Use Allowed</Radio>
              </RadioGroup>
            </LabelForm>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoiceInformationForm;
