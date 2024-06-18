"use client";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { ScrollShadow, Tab } from "@nextui-org/react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import VoiceHistoryItem from "./VoiceHistoryItem";
import InfiniteScroll from "../components/infinite-scroll/InfiniteScroll";
import VoiceHistoryItemSkeleton from "./VoiceHistoryItemSkeleton";

const limit = 4;

function VoiceHistoryList() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

	const initVoiceList:Array<TypeVoice> = []

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [voiceList, setVoiceList] = useState<TypeVoice[]>(initVoiceList);
  
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    await sleep(1000);
    let newVoiceList: TypeVoice[] =[];
    for (let i = 1; i < limit+1; i++) {
      newVoiceList.push({
        id: i + count,
				avatar: 'https://via.placeholder.com/64x64',
				name: `大叔成熟男声音${i + count}`,
				tone: 'tone',
				content: 'Your audio has been successfully generated. You may',
				voiceSrc: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
				datetime: 'Just now',
				tags: 'tag1,tag2,tag3',
        type: (i%2 === 0) ? 'API' : 'FILE',
      })
    }
    setCount(count + limit);
    setVoiceList([...voiceList, ...newVoiceList]);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
			<ScrollShadow size={32} visibility="top" hideScrollBar id="scrollableVoiceHistoryDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-8">
				<InfiniteScroll
					dataLength={voiceList.length}
					next={loadMoreData}
					hasMore={voiceList.length < 9990}
					loader={<><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /></>}
					scrollableTarget="scrollableVoiceHistoryDiv"
					className="w-full self-stretch grow shrink basis-0 flex-col justify-start items-center gap-6 flex"
				>
					{voiceList.map((voice) => (
						<VoiceHistoryItem voice={voice} key={voice.id} />
					))}
				</InfiniteScroll>
			</ScrollShadow>
		</div>
  );
}

export default VoiceHistoryList;
