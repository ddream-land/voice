"use client";
import React, { useState } from "react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import APIIcon from "@/app/icons/APIIcon";
import { Button } from "@nextui-org/react";
import VoiceHistoryItemAPI from "./VoiceHistoryItemAPI";
import VoiceHistoryItemVoiceRreview from "./VoiceHistoryItemVoicePreview";

function VoiceHistoryItem({voice}: {
  voice: TypeVoice
}) {
	const tagsList = voice.tags.split(",");
  const [selected, setSelected] = useState("GET");

  return (
		<div className="self-stretch flex-col justify-center items-start gap-6 flex">
			<div className="self-stretch rounded-xl flex-col justify-start items-start gap-2 flex">
				<div className="self-stretch p-6 bg-neutral-800 rounded-xl flex-col justify-start items-start gap-4 flex">
					<div className="self-stretch h-[121px] flex-col justify-start items-start gap-2.5 flex">
							<div className="self-stretch justify-start items-start gap-6 inline-flex">
									<div className="justify-start items-start gap-2 flex">
											<div className="rounded-2xl justify-end items-center flex">
													<img className="w-16 h-16" src={voice.avatar} />
											</div>
									</div>
									<div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
											<div className="self-stretch text-white text-lg font-semibold font-['Archivo'] leading-normal">{voice.name}</div>
											<div className="px-2 py-1 bg-neutral-800 rounded-md justify-center items-center gap-2 inline-flex">
													<div className="text-white text-sm font-medium font-['Inter']">{voice.tone}</div>
											</div>
									</div>
							</div>
							
							{/* <div className="self-stretch"><span className="text-primary text-sm font-medium font-['Inter']">Your audio has been successfully generated. You may</span><span className="text-white text-sm font-medium font-['Inter']"> further customize it or simply download it for use.</span></div> */}
							<div className="self-stretch">{voice.content}</div>
					</div>
					{voice.type === 'FILE' ? (
						<>
							<VoiceHistoryItemVoiceRreview voiceSrc={voice.voiceSrc} />
							<div className="self-stretch justify-start items-start gap-4 inline-flex">
								<Button
									color="default"
									size="lg"
									variant="ghost"
									className='px-0 grow'
									endContent={<ArrowDownTrayIcon className="w-5 h-5 fill-zinc-400 shrink-zinc-400" />}
								>Download</Button>
								<Button
									color="default"
									size="lg"
									variant="ghost"
									className='px-0 grow'
									endContent={<APIIcon className="w-5 h-5" />}
								>API</Button>
							</div>
						</>
					) : (
						<VoiceHistoryItemAPI voice={voice} />
					)}
					
				</div>
				<div className="self-stretch h-6 flex-col justify-start items-end flex">
					<div className="self-stretch justify-between items-center inline-flex">
						<div className="justify-start items-start gap-2 flex">
							<div className="text-gray-500 text-xs font-medium font-['Inter']">Just now</div>
						</div>
						{/* <div className="gap-2 flex flex-row">
							{tagsList.map((tag, index) => (
								<div key={index} className="px-2 py-0.5 bg-neutral-800 rounded-md justify-center items-center gap-2 flex">
									<div className="text-white text-xs font-medium font-['Inter'] leading-tight">{tag}</div>
								</div>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</div>
  );
}

export default VoiceHistoryItem;
