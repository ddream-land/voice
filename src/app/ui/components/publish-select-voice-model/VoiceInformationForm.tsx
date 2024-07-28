"use client";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import {
  VoicePublishInfoType,
} from "@/app/lib/definitions.voice";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import UploadFile from "../upload-file/UploadFile";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";
import TagsInput from "../TagsInput";
import { useTranslations } from "next-intl";

type TypeFilterItem = {
  label: string;
  value: string;
};

function VoiceInformationForm({
  value,
  onChange,
}: {
  value: VoicePublishInfoType,
  onChange: (value: VoicePublishInfoType) => void,
}) {

  const t = useTranslations();
  const [sourceType, setSourceType] = useState(value.source);

  const types: Array<TypeFilterItem> = [{
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

  const initPermissions = []
  if (value.permission.credit_free) {
    initPermissions.push('credit-free')
  }
  if (value.permission.reprint_allowed) {
    initPermissions.push('reprint-allowed')
  }
  if (value.permission.modification_allowed) {
    initPermissions.push('modification-allowed')
  }
  if (value.permission.permission_change_allowed) {
    initPermissions.push('permission-change-allowed')
  }
  const [permissions, setPermissions] = useState<string[]>(initPermissions);

  useEffect(() => {
    let newPermissions = [...permissions];
    if (!permissions.includes('modification-allowed') && permissions.includes('permission-change-allowed')) {
      delete newPermissions[permissions.indexOf('permission-change-allowed')];
      setPermissions(newPermissions);
    }

    onChange({ ...value, permission: {
      ...value.permission,
      credit_free: newPermissions.includes('credit-free'),
      reprint_allowed: newPermissions.includes('reprint-allowed'),
      modification_allowed: newPermissions.includes('modification-allowed'),
      permission_change_allowed: newPermissions.includes('permission-change-allowed'),
    }})
  }, [permissions])

  return (
    <div className="w-full flex-col justify-start items-start gap-12 flex">
      <TitleModal title={t("PublishVoiceModel.voiceInformationTitle")} />
      <div className="self-stretch flex-col justify-start items-start gap-8 flex">
        <LabelForm label={t("PublishVoiceModel.coverLabel")} isRequired={true}>
          <div className="w-full h-[136px]">
            <UploadFile
              accept="image"
              label={t("PublishVoiceModel.coverPlaceholder")}
              onDone={(res) => {
                onChange && onChange({
                  ...value,
                  cover_url: res.url
                })
              }}
              icon={<PlusCircleIcon className="w-6 h-6 stroke-zinc-400" />}
            ></UploadFile>
          </div>
        </LabelForm>
        <LabelForm label={t("PublishVoiceModel.nameLabel")} isRequired={true}>
          <Input
            classNames={{
              base: "grow",
              // inputWrapper: 'bg-zinc-700'
            }}
            type="text"
            variant="bordered"
            isRequired
            color="default"
            placeholder={t("PublishVoiceModel.namePlaceholder")} 
            value={value.name as string}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
          />
        </LabelForm>
        <LabelForm label={t("PublishVoiceModel.typeLabel")}  isRequired={true}>
          <Select
            disallowEmptySelection={true}
            variant="bordered"
            size="md"
            isRequired
            placeholder={t("PublishVoiceModel.typePlaceholder")} 
            selectedKeys={[value.type as string]}
            onChange={(e) => onChange({ ...value, type: e.target.value })}
          >
            {types.map((vmtItem) => (
              <SelectItem
                key={vmtItem.value}
                value={vmtItem.value}
                classNames={{
                  base: "h-12 pl-2 pr-3 py-2 rounded-xl gap-4",
                }}
              >
                {vmtItem.label}
              </SelectItem>
            ))}
          </Select>
        </LabelForm>

        <LabelForm label={t("PublishVoiceModel.tagLabel")} isRequired={false}>
          <TagsInput value={value.tag} placeholder={t("PublishVoiceModel.tagPlaceholder")} onValueChange={(e) => onChange({ ...value, tag: e })} />
        </LabelForm>

        <LabelForm label={t("PublishVoiceModel.descriptionLabel")} isRequired={false}>
          <Textarea
            classNames={{
              base: "grow",
              // inputWrapper: 'bg-zinc-700'
            }}
            type="text"
            variant="bordered"
            isRequired
            color="default"
            placeholder={t("PublishVoiceModel.descriptionPlaceholder")}
            value={value.desc as string}
            onChange={(e) => onChange({ ...value, desc: e.target.value })}
          />
        </LabelForm>

        <LabelForm label={t("VoiceModelSource.source")} isRequired={true}>
          <div className="w-full flex flex-row gap-3 items-end">
            <RadioGroup value={sourceType} onValueChange={(e) => {
              setSourceType(e);
              if (e === "original") {
                onChange({ ...value, source: "original" });
              } else {
                onChange({ ...value, source: "" });
              }
            }}>
              <Radio value="original" classNames={{ base: "py-6" }}>
                {t("VoiceModelSource.original")}
              </Radio>
              <Radio value="reprinting" classNames={{ base: "py-6" }}>
                {t("VoiceModelSource.reprinting")}
              </Radio>
            </RadioGroup>
            {sourceType === "reprinting" && (
              <Input
                type="text"
                size="md"
                variant="bordered"
                isRequired
                color="default"
                placeholder={t("VoiceModelSource.reprintingUrl")}
                value={value.source as string}
                onChange={(e) => onChange({ ...value, source: e.target.value })}
              />
            )}
          </div>
        </LabelForm>

        <LabelForm label={t("VoiceModelPermission.modelDownloadPermissions")} isRequired={true}>
          <RadioGroup
            value={value.permission.download_permission ? 'FreeDownload' : 'DoNotAllowDownloads'}
            onValueChange={(e) => {
              onChange({
                ...value,
                permission: {
                  ...value.permission,
                  download_permission: e === 'FreeDownload',
                },
              });
            }}
          >
            <Radio value="FreeDownload">{t("VoiceModelPermission.freedownloadTrue")}</Radio>
            <Radio value="DoNotAllowDownloads">{t("VoiceModelPermission.freeDownloadFalse")}</Radio>
          </RadioGroup>
        </LabelForm>

        <LabelForm label={t("VoiceModelPermission.permissions")} isRequired={true}>
          <CheckboxGroup
            value={permissions}
            onValueChange={setPermissions}
            defaultValue={[]}
          >
            <Checkbox value="credit-free">{t("VoiceModelPermission.creditFreeTrue")}</Checkbox>
            <Checkbox value="reprint-allowed">{t("VoiceModelPermission.reprintAllowed")}</Checkbox>
            <Checkbox value="modification-allowed">{t("VoiceModelPermission.modificationAllowed")}</Checkbox>
            <Checkbox value="permission-change-allowed" classNames={{ base: 'pl-10'}} isDisabled={(() => {
              return !permissions.includes('modification-allowed');
            })()}>{t("VoiceModelPermission.permissionChangeAllowed")}</Checkbox>
          </CheckboxGroup>
          
        </LabelForm>

        <LabelForm label={t("VoiceModelPermission.commercialLicense")} isRequired={true}>
          <RadioGroup
            value={value.permission.commercial_license ? 'CommercialUseAllowe' : 'CommercialUseDeclined'}
            onValueChange={(e) => {
              onChange({
                ...value,
                permission: {
                  ...value.permission,
                  commercial_license: e === 'CommercialUseAllowe',
                },
              });
            }}
          >
            <Radio value="CommercialUseAllowe">{t("VoiceModelPermission.commercialUseAllowed")}</Radio>
            <Radio value="CommercialUseDeclined">{t("VoiceModelPermission.commercialUseDeclined")}</Radio>
          </RadioGroup>
        </LabelForm>
      </div>
    </div>
  );
}

export default VoiceInformationForm;
