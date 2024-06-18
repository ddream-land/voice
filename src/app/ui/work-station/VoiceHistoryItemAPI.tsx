"use client";
import React, { useState } from "react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import { Snippet, Tab, Tabs } from "@nextui-org/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function VoiceHistoryItemAPI({voice}: {
  voice: TypeVoice
}) {
	const tagsList = voice.tags.split(",");
  const [selected, setSelected] = useState("GET");

  return (
		<div className="w-[268px] rounded-xl border border-zinc-700 flex-col justify-start items-start inline-flex overflow-hidden">
			<Tabs
				aria-label="Options"     
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				classNames={{
					panel: "p-0 w-full"
				}}
				fullWidth
			>
				<Tab key="GET" title="get">				
					<Snippet classNames={{
						base: "bg-zinc-900 rounded-none overflow-scroll w-full relative",
						content: "",
						copyButton: " top-5 right-6 absolute"
					}}>
						{/* <CopyIcon className=" cursor-pointer w-5 h-5 fill-neutral-900 stroke-neutral-900 absolute top-5 right-6" /> */}
						<SyntaxHighlighter
							language="javascript"
							style={a11yDark}
							wrapLongLines={true}
							customStyle={{
								margin: '0 0',
								background: 'transparent',
							}}
						>
							{"function get(classNames) {\n  return classNames.join(' ');\n}\n"}
						</SyntaxHighlighter>
					</Snippet>
				</Tab>
				<Tab key="POST" title="Post">

				<Snippet classNames={{
						base: "bg-zinc-900 rounded-none"
					}}>
						<SyntaxHighlighter
							language="javascript"
							style={a11yDark}
							wrapLongLines={true}
							customStyle={{
								margin: '0 0',
								background: 'transparent',
							}}
						>
							{"function post(classNames) {\n  return classNames.join(' ');\n}\n"}
						</SyntaxHighlighter>
					</Snippet>
				</Tab>
			</Tabs>
		</div>
  );
}

export default VoiceHistoryItemAPI;
