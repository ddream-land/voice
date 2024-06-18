"use client";
import React, { useEffect, useState } from "react";
import VoiceModelItem from "./VoiceModelItem";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";
import VoiceModelItemSkeleton from "./VoiceModelItemSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";

const limit = 10;

function VoiceModelList({
  onItemClick,
}: {
  onItemClick?: (voiceModel: TypeVoiceModel) => void;
}) {

  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null >(null);

  const initVoiceModelList:Array<TypeVoiceModel> = []

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [voiceList, setVoiceModelList] = useState<TypeVoiceModel[]>(initVoiceModelList);
  
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
    let newVoiceModelList: TypeVoiceModel[] =[];
    for (let i = 1; i < limit+1; i++) {
      newVoiceModelList.push({
        id: i + count,
        src: 'https://via.placeholder.com/160x90',
        name: `大叔成熟男声音${i + count}`,
        count: 3500000,
        star: i%2 === 1,
      })
    }
    setCount(count + limit);
    setVoiceModelList([...voiceList, ...newVoiceModelList]);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      <ScrollShadow size={32} visibility="top" hideScrollBar id="scrollableVoiceModelDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-8 px-8">
        <InfiniteScroll
          dataLength={voiceList.length}
          next={loadMoreData}
          hasMore={voiceList.length < 50}
          loader={<><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /></>}
          scrollableTarget="scrollableVoiceModelDiv"
          className="w-full self-stretch items-start grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {voiceList.map((voice) => (
            <div key={voice.id} onClick={() => {
              // onItemClick && onItemClick(voice);
              if(selectedVoiceModel && (voice.id === selectedVoiceModel.id)) {
                setSelectedVoiceModel(null);
                return;
              };
              setSelectedVoiceModel(voice);
            }}>
              <VoiceModelItem onItemClick={onItemClick} voice={voice} key={voice.id} isSelected={(selectedVoiceModel !== null) && (voice.id === selectedVoiceModel.id)} />
            </div>
          ))}
        </InfiniteScroll>
      </ScrollShadow>

      <div className="h-14" />
    </div>
  );
}

export default VoiceModelList;
