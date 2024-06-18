"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import MainStation from "./MainStation";
import VoiceHistory from "./VoiceHistory";

function WorkStation() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  return (
    <div className="w-full h-screen pt-14 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <MainStation />
        <VoiceHistory />
      </div>
  </div>
  );
}

export default WorkStation;
