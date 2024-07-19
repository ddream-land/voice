"use client";
import React, { useEffect, useState } from "react";
import VoiceAssetDetailLeft from "./VoiceModelDetailLeft";
import VoiceAssetDetailRight from "./VoiceModelDetailRight";
import { getVoicePublishInfo } from "@/app/lib/voice.api";
import { VoiceModelPublishType } from "@/app/lib/definitions.voice";

function VoiceAssetDetail({
  publishId,
}: {
  publishId: string;
}) {
  const getVoicePublishInfoApi = getVoicePublishInfo();
  const [voicePublishInfo, setVoicePublishInfo] = useState<VoiceModelPublishType>();
  const [loading, setLoading] = useState(false);
  
  const getVoicePublishInfoToServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoicePublishInfoApi.send({
      "publish_id": publishId
    });
    if (res && res.code === 0) {
      setVoicePublishInfo(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (publishId) {
      getVoicePublishInfoToServer();
    }
  }, []);

  return (
    <div className="w-full bg-black/opacity-30 rounded-2xl flex-col justify-start items-end gap-2.5 inline-flex">
      <div className="self-stretch pb-16 bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl flex-col justify-start items-center gap-2.5 flex">
          <div className="w-full pt-16 pb-6">
            {/* <div className="w-full">
              {voicePublishInfo && (<VoiceAssetDetailHeader voicePublishInfo={voicePublishInfo}/>)}
            </div> */}
            <div className="w-full justify-between items-start gap-12 flex">
              <div className="grow overflow-hidden">
                {voicePublishInfo && (<VoiceAssetDetailLeft voicePublishInfo={voicePublishInfo}/>)}
              </div>
              <div className="shrink">
                {voicePublishInfo && (<VoiceAssetDetailRight voicePublishInfo={voicePublishInfo}/>)}
              </div>
            </div>
          </div>
      </div>
  </div>
  );
}

export default VoiceAssetDetail;
