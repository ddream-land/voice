"use client";
import React, { useEffect, useState } from "react";
import { downloadVoiceModel } from "@/app/lib/voice.api";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import { downloadFiles, sleep } from "@/app/lib/utils";

function VoiceModelDownloadButton({
  type,
  publishId,
  modelId,
  startDownload = 0,
  onDownloading
}: {
  type: string,
  publishId?: string
  modelId?: string
  startDownload: number
  onDownloading: (downlading: boolean) => void
}) {
  const [downlanding, setDownlanding] = useState(false);
  const amDispatch = useAmDispatch();

  const downloadVoiceModelApi = downloadVoiceModel();
  const downloadVoiceModelServer = async () => {
    if (downlanding) {
      return;
    }
    setDownlanding(true);
    onDownloading(true);

    const res = await downloadVoiceModelApi.send({
      "model_id": modelId || '',
      "publish_id": publishId || ''
    });
    if (res && res.code === 0) {

      const files = []
      if (type === 'gpt') {
        if (res.data.gpt_path) {
          files.push(res.data.gpt_path)
        } else {
          amDispatch({
            type: "add",
            payload: {
              message: 'gpt file not exist',
              type: "error"
            },
          })
        }
      }
      
      if (type === 'sovits') {
        if (res.data.sovits_path) {
          files.push(res.data.sovits_path)
        } else {
          amDispatch({
            type: "add",
            payload: {
              message: 'sovits file not exist',
              type: "error"
            },
          })
        }
      }

      if (files.length > 0) {
        downloadFiles(files);
      }

      setDownlanding(false);
      onDownloading(false);
    }

    setDownlanding(false);
  };

  useEffect(() => {
    if (startDownload > 0) {
      downloadVoiceModelServer();
    }
  }, [startDownload])
  return (
    <div className="hidden"></div>
  );
}

export default VoiceModelDownloadButton;
