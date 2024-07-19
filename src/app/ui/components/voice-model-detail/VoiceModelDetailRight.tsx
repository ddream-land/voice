"use client";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import { ArrowDownTrayIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, Snippet, Avatar, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { VoiceModelPublishType } from "@/app/lib/definitions.voice";
import { getStarNumStr } from "@/app/lib/utils";
import moment from 'moment';
import VoiceModelCollectButton from "./VoiceModelCollectButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import VoiceModelDownloadButton from "../voice-model-download-button/VoiceModelDownloadButton";
import ShareIcon from "@/app/icons/ShareIcon";
import { StarIcon } from "@heroicons/react/24/solid";
import DownloadIcon from "@/app/icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { useRouter } from "@/navigation";
import VoiceModelDetailPublisher from "./VoiceModelDetailPublisher";

function VoiceAssetDetailRight({
  voicePublishInfo, 
}: {
  voicePublishInfo: VoiceModelPublishType
}) {
  const router = useRouter();
  const [startDownload, setStartDownload] = useState(0);
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
        >Run on WorkStation</Button>
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
            <Tooltip content="Download CKPT File">
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
            <Tooltip content="Download PTH File">
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
              Runnings
            </div>
            <div className="self-stretch text-white text-sm font-semibold leading-tight">
              {getStarNumStr(voicePublishInfo.inf_num)}
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
              Downloads
            </div>
            <div className="self-stretch text-white text-sm font-semibold leading-tight">
              {getStarNumStr(voicePublishInfo.d_num)}
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
              Sharing
            </div>
            <div className="self-stretch text-white text-sm font-semibold leading-tight">
              {getStarNumStr(voicePublishInfo.star_num)}
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
            By
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
            Time
          </div>
          <div className="text-white text-sm font-semibold leading-tight">
          {moment(voicePublishInfo.seq, "X").format('hh:mm MMMM DD YYYY')}
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
            Source
          </div>
          <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold leading-tight">
              {voicePublishInfo.publish_info.source === 'original' ? 'Original' : 'Reprint'}
            </div>
            {voicePublishInfo.publish_info.source !== 'original' && voicePublishInfo.publish_info.source.length > 0 && (
              <div className="grow shrink basis-0 text-white text-sm font-semibold leading-tight">
                From: {voicePublishInfo.publish_info.source}
              </div>
            )} 
            
          </div>
        </div>
        <div className="self-stretch py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
            Permissions
          </div>
          <div className="flex-col justify-center items-start gap-2 flex">
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.download_permission ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.download_permission ? 'Free download' : 'Do not allow downloads'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.credit_free ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.credit_free ? 'Credit Free' : 'Credit Free'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.reprint_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.reprint_allowed ? 'Reprint Allowed' : 'Reprint Allowed'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.modification_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.modification_allowed ? 'Modification Allowed' : 'Modification Declined'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.permission_change_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.permission_change_allowed ? 'Permission Change Allowed' : 'Permission Change Declined'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.commercial_license ? (
                <CheckBadgeIcon className="w-5 h-5 fill-amber-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold leading-tight">
                {voicePublishInfo.publish_info.permission.commercial_license ? 'Commercial Use Allowed' : 'Commercial Use Declined'}
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
