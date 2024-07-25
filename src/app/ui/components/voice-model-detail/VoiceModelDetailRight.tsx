"use client";
import { ArrowDownTrayIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, Snippet, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { VoiceModelPublishType } from "@/app/lib/definitions.voice";
import { getStarNumStr } from "@/app/lib/utils";
import moment from 'moment';
import VoiceModelCollectButton from "./VoiceModelCollectButton";
import VoiceModelDownloadButton from "../voice-model-download-button/VoiceModelDownloadButton";
import ShareIcon from "@/app/icons/ShareIcon";
import { useRouter } from "@/navigation";
import VoiceModelDetailPublisher from "./VoiceModelDetailPublisher";
import { useTranslations } from "next-intl";

function VoiceAssetDetailRight({
  voicePublishInfo, 
}: {
  voicePublishInfo: VoiceModelPublishType
}) {
  const router = useRouter();
  const t = useTranslations();
  const [startGptDownload, setStartGptDownload] = useState(0);
  const [startSovitsDownload, setStartSovitsDownload] = useState(0);
  const [downloading, setDownlanding] = useState(false);
  const pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : '';
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const url = `${origin}${pathname}?publishId=${voicePublishInfo.publish_id}`

  return (
    <div className="flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch justify-between items-end inline-flex">
        <div className="w-full shrink-0 self-stretch justify-end items-center gap-2 flex">
          <VoiceModelCollectButton like={voicePublishInfo.like} publishId={voicePublishInfo.publish_id} starNum={voicePublishInfo.star_num} />
					{/* <Button size="lg" variant="bordered"  startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} /> */}
        </div>
      </div>
      <div className="justify-start items-start gap-2 inline-flex">
        <Button
          size="lg"
          color="primary"
          variant="ghost"
          className="w-[236px]"
          startContent={<RocketLaunchIcon className="h-6 w-6 fill-primary group-hover:fill-white" />}
          onPress={() => {
            // setIsOpen(true)
            router.push(`/workstation?publishId=${voicePublishInfo.publish_id}`);
          }}
        >{t("VoiceModelDetail.runOnWorkStation")}</Button>
        {voicePublishInfo.publish_info.permission.download_permission && (
          <>
            <VoiceModelDownloadButton
              type="gpt"
              publishId={voicePublishInfo.publish_id}
              startDownload={startGptDownload}
              onDownloading={(newDownloading) => {
                setDownlanding(newDownloading);
              }}
            />
            <VoiceModelDownloadButton
              type="sovits"
              publishId={voicePublishInfo.publish_id}
              startDownload={startSovitsDownload}
              onDownloading={(newDownloading) => {
                setDownlanding(newDownloading);
              }}
            />
            <Tooltip content={t("VoiceModelDetail.downloadCKPTFile")}>
              <Button
                disableRipple={false}
                size="lg"
                variant="bordered"
                startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />}
                isIconOnly={true}
                onPress={() => {
                  setStartGptDownload(startGptDownload + 1);
                }}
                isDisabled={downloading}
                />
            </Tooltip>
            <Tooltip content={t("VoiceModelDetail.downloadPTHFile")}>
              <Button
                disableRipple={false}
                size="lg"
                variant="bordered"
                startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />}
                isIconOnly={true}
                onPress={() => {
                  setStartSovitsDownload(startSovitsDownload + 1);
                }}
                isDisabled={downloading}
              />
            </Tooltip>
          </>
        ) }
        <Snippet
          variant="bordered"
          copyIcon={<ShareIcon className="fill-zinc-400 w-4 h-4" />}
          classNames={{
            pre: 'hidden',
            base: 'px-1.5'
          }}
          size="md"
          hideSymbol={true}
        >
          {url}
        </Snippet>
      </div>
      <div className="self-stretch flex-col justify-start items-start flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
            {t("VoiceModelDetail.runnings")}
            </div>
            <div className="self-stretch text-white text-sm font-semibold leading-tight">
              {getStarNumStr(voicePublishInfo.inf_num)}
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
              {t("VoiceModelDetail.downloads")}
            </div>
            <div className="self-stretch text-white text-sm font-semibold leading-tight">
              {getStarNumStr(voicePublishInfo.d_num)}
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
              {t("VoiceModelDetail.sharing")}
            </div>
            <div className="self-stretch text-white text-sm font-semibold leading-tight">
              {getStarNumStr(voicePublishInfo.star_num)}
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
          {t("VoiceModelDetail.by")}
          </div>
          <div className="self-stretch justify-center items-start gap-2.5 inline-flex">
            {/* <div className="text-white text-sm font-semibold leading-tight">
              fuhsi Voice Studio
            </div> */}
            <div className="grow shrink basis-0 text-white text-sm font-semibold leading-tight">
            { voicePublishInfo.publish_type === 1  && 'DDream Voice Studio'}
            { voicePublishInfo.publish_type === 2  && 'Self-trained'}
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
            {t("VoiceModelDetail.time")}
          </div>
          <div className="text-white text-sm font-semibold leading-tight">
          {moment(voicePublishInfo.seq, "X").format('hh:mm MMMM DD YYYY')}
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
            {t("VoiceModelSource.source")}
          </div>
          <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold leading-tight">
              {voicePublishInfo.publish_info.source === 'original' ? t("VoiceModelSource.original") : t("VoiceModelSource.reprinting")}
            </div>
            {voicePublishInfo.publish_info.source !== 'original' && voicePublishInfo.publish_info.source.length > 0 && (
              <div className="grow shrink basis-0 text-white text-sm font-semibold leading-tight">
                {t("VoiceModelDetail.sourceFrom")}: {voicePublishInfo.publish_info.source}
              </div>
            )} 
            
          </div>
        </div>
        <div className="self-stretch py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
          {t("VoiceModelPermission.permissions")}
          </div>
          <div className="flex-col justify-center items-start gap-2 flex">
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.download_permission ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.download_permission ? t("VoiceModelPermission.freedownloadTrue") : t("VoiceModelPermission.freedownloadFalse")}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.credit_free ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.credit_free ? t("VoiceModelPermission.creditFreeTrue") : t("VoiceModelPermission.creditFreeFalse")}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.reprint_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.reprint_allowed ? t("VoiceModelPermission.reprintAllowed") : t("VoiceModelPermission.reprintDeclined")}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.modification_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.modification_allowed ? t("VoiceModelPermission.modificationAllowed") : t("VoiceModelPermission.modificationDeclined")}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.permission_change_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.permission_change_allowed ? t("VoiceModelPermission.permissionChangeAllowed") : t("VoiceModelPermission.permissionChangeDeclined")}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.commercial_license ? (
                <CheckBadgeIcon className="w-5 h-5 fill-amber-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.commercial_license ? t("VoiceModelPermission.commercialUseAllowed") : t("VoiceModelPermission.commercialUseDeclined")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <VoiceModelDetailPublisher publisher={voicePublishInfo.publisher} />
    </div>
  );
}

export default VoiceAssetDetailRight;
