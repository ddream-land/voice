"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";

function VoiceHistoryControl() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("Voices");

  return (
    <div className="px-8 pt-8 bg-neutral-900">
			<div className="self-stretch justify-between items-center inline-flex w-full mb-5">
					<div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">History</div>
					<div className="w-[106px] self-stretch px-4 py-3 rounded-[48px] border-2 border-neutral-800 justify-start items-center gap-2 flex">
							<div className="text-slate-100 text-sm font-medium font-['Inter']">Filters</div>
							<FilterIcon className="w-6 h-6" />
					</div>
			</div>
			<Tabs
				aria-label="Options"     
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				classNames={{
					panel: "p-0 w-full"
				}}
				fullWidth
			>
				<Tab key="Voices" title="Voices">
				</Tab>
				<Tab key="API" title="API">
				</Tab>
			</Tabs>
		</div>
  );
}

export default VoiceHistoryControl;
