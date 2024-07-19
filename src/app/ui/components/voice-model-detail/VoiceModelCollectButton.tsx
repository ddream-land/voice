"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button, cn } from "@nextui-org/react";
import React, { useState } from "react";
import { voiceModelCancelCollect, voiceModelCollect } from "@/app/lib/voice.api";
import { getStarNumStr } from "@/app/lib/utils";

function VoiceModelCollectButton({
  like,
  publishId,
  starNum,
}: {
  like: boolean
  publishId: string
  starNum: number
}) {
  const [collecting, setCollecting] = useState(false);
  const [isCollected, setIsCollected] = useState(like);

  const voiceModelCollectApi = voiceModelCollect();
  const voiceModelCollectServer = async () => {
    if (collecting) {
      return;
    }
    setCollecting(true);

    const res = await voiceModelCollectApi.send({
      "publish_id": publishId,
    });
    if (res && res.code === 0) {
      setIsCollected(true);
    }

    setCollecting(false);
  };

  const voiceModelCancelCollectApi = voiceModelCancelCollect();
  const voiceModelCancelCollectServer = async () => {
    if (collecting) {
      return;
    }
    setCollecting(true);

    const res = await voiceModelCancelCollectApi.send({
      "publish_id": publishId,
    });
    if (res && res.code === 0) {
      setIsCollected(false);
    }

    setCollecting(false);
  };

  const computerStarNumStr = () => {
    let realStarNum = starNum;
    if (like && !isCollected) {
      realStarNum--
    }
    if (!like && isCollected) {
      realStarNum++
    }
    return getStarNumStr(realStarNum)
  }
  

  return (
    <Button
      isDisabled={collecting}
      size="lg"
      variant="flat" 
      startContent={<StarIcon className={cn("w-6 h-6",(isCollected ? "fill-amber-500" : "fill-zinc-400"))} />}
      onPress={isCollected ? voiceModelCancelCollectServer : voiceModelCollectServer}
      className="w-40"
    >Star {computerStarNumStr()} </Button>
  );
}

export default VoiceModelCollectButton;
