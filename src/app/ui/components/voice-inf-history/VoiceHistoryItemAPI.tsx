"use client";
import React, { useState } from "react";
import { Snippet, Tab, Tabs } from "@nextui-org/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import { template } from "lodash-es";

const CODE_TEMPLATE = 
`import requests
import json

url = "https://service.ddream.land/ddream/api/v1/voice/quick_inf"

headers = {"Content-Type": "application/json", "da_token": "<%= userToken %>/json"}
payload = {
    "publish_id": "<%= publish_id %>",
    "model_id": "<%= model_id %>",
    ",
    "text": "<%= text %>",
    "basic_params": {
        "language": "<%= bpLanguage %>"
        "seg_method": "<%= bpSegMethod %>",
        "speed": "<%= bpSpeed %>",
        "m_w_a_p_s": "<%= bpMwaps %>"
    },
    "advance_params": {
        "seed": "<%= apSeed %>",
        "top_k": "<%= apTopK %>",
        "top_p": "<%= apTopP %>",
        "temperature": "<%= apTemperature %>"
    },
    "tone": {
        "tone_type": "<%= toneType %>",
        "audio_url": "<%= toneAudioUrl %>",
        "text": "<%= toneText %>"
    }
}

response = requests.post(url, headers=headers, do_body=json.dumps(payload))

print(response.text)`


function VoiceHistoryItemAPI({
	userToken,
	voiceInfHistory,
}: {
	userToken: string
  voiceInfHistory: VoiceInfHistoryType
}) {
  const [selected, setSelected] = useState("GET");

	const compiled = template(CODE_TEMPLATE);
	const codeText = compiled({
		userToken: userToken,
		publish_id: voiceInfHistory.publish_id,
		model_id: voiceInfHistory.model_id,
		text: voiceInfHistory.text,
		bpLanguage: voiceInfHistory.basic_params.language,
		bpSegMethod: voiceInfHistory.basic_params.seg_method,
		bpSpeed: voiceInfHistory.basic_params.speed,
		bpMwaps: voiceInfHistory.basic_params.m_w_a_p_s,
		apSeed: voiceInfHistory.advance_params.seed,
		apTopK: voiceInfHistory.advance_params.top_k,
		apTopP: voiceInfHistory.advance_params.top_p,
		apTemperature: voiceInfHistory.advance_params.temperature,
		toneType: voiceInfHistory.tone.tone_type,
		toneAudioUrl: voiceInfHistory.tone.audio_url,
		toneText: voiceInfHistory.tone.text,
	});

	const codeList = [{
	  type: 'python',
		code: codeText
	}]

  return (
		<div className="w-full rounded-xl border border-zinc-700 flex-col justify-start items-start inline-flex overflow-hidden">
			<Tabs
				aria-label="Options"     
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				classNames={{
					panel: "p-0 w-full"
				}}
				fullWidth
			>
				{codeList.map((code, index) => (
					<Tab key={code.type} title={code.type}>				
						<Snippet
							classNames={{
								base: "bg-zinc-900 rounded-none overflow-scroll w-full relative",
								content: "",
								copyButton: " top-5 right-6 absolute",
								pre: "w-full overflow-scroll",
							}}
							hideSymbol={true}
						>
							{/* <CopyIcon className=" cursor-pointer w-5 h-5 fill-neutral-900 stroke-neutral-900 absolute top-5 right-6" /> */}				
								<SyntaxHighlighter
									language={code.type}
									style={a11yDark}
									wrapLongLines={false}
									customStyle={{
										margin: '0 0',
										background: 'transparent',
									}}
								>
									{code.code}
								</SyntaxHighlighter>
						</Snippet>
					</Tab>
				))}
			</Tabs>
		</div>
  );
}

export default VoiceHistoryItemAPI;
