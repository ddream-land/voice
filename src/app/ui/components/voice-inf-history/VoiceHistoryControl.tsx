"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tab, Tabs } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";
import { InfType } from "@/app/lib/definitions.voice";

function VoiceHistoryControl({
	type,
  onChange,
}: {
	type: InfType
  onChange?: (infType: InfType) => void;
}) {
  const router = useRouter();
  const t = useTranslations();

  return (
		<Tabs
			aria-label="Options"     
			selectedKey={type}
			onSelectionChange={(key) => onChange && onChange(key as InfType)}
			classNames={{
				panel: "p-0 w-full"
			}}
			fullWidth
		>
			<Tab key="audio" title="Voices">
			</Tab>
			<Tab key="code" title="API">
			</Tab>
		</Tabs>
  );
}

export default VoiceHistoryControl;
