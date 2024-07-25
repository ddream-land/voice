"use client";
import React, { useEffect, useState } from "react";
import VoiceModelItem from "./VoiceModelItem";
import { VoiceModelType } from "@/app/lib/definitions.voice";
import VoiceModelItemSkeleton from "./VoiceModelItemSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import { getMyPublish, getPublishSquare } from "@/app/lib/voice.api";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";


function VoiceModelList({
  filters,
  selectedVoiceModel,
  type = 'all',
  onItemClick,
  onChange,
}: {
  filters?: VoiceModelFilterType
  selectedVoiceModel?: VoiceModelType | null;
  type?: 'workstation' | 'my' | 'all';
  onItemClick?: (voiceModel: VoiceModelType | null) => void;
  onChange?: (voiceModelList: VoiceModelType[]) => void;
}) {
  let getVoiceModelListApi: any;
  if (type === 'my') {
    getVoiceModelListApi = getMyPublish();
  } else {
    getVoiceModelListApi = getPublishSquare();
  }

  const initVoiceModelList:Array<VoiceModelType> = []
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceModelList, setVoiceModelList] = useState<VoiceModelType[]>(initVoiceModelList);
  
  const [prevFilters, setPrevFilters] = useState(filters);


  const sWidth = window.innerWidth;
  let rowCount = 2
  if (sWidth > 1024) {
    rowCount = 4
  }
  if (sWidth > 1536) {
    rowCount = 6
  }

  const getPublishSquareToServer = async ({isFirst = false}) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoiceModelListApi.send({
      page_token: isFirst ? '' : nextPageToken,
      size: isFirst ? rowCount * 6 : rowCount * 2,
      type: filters?.type || '',
      name: filters?.name || ''
    });
    if (res && res.code === 0) {
      onChange && onChange(res.data.list);
      
      let newVoiceModelList: VoiceModelType[] = res.data.list;
      if (isFirst) {
        setCount(newVoiceModelList.length);
        setVoiceModelList([...newVoiceModelList]);
      } else {
        setCount(count + newVoiceModelList.length);
        setVoiceModelList([...voiceModelList, ...newVoiceModelList]);
      }
      setLoading(false);
      setHasMore(res.data.has_more)
      setNextPageToken(res.data.next_page_token)
    }

    setLoading(false);
  };

  if (filters) {
    if (prevFilters?.type !== filters.type || prevFilters.name !== filters.name) {
      setPrevFilters(filters);
      getPublishSquareToServer({isFirst: true});
    }
  }

  useEffect(() => {
    getPublishSquareToServer({isFirst: true});
  }, []);


  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      <ScrollShadow size={16} hideScrollBar id="scrollableVoiceModelDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-4 px-8">
        <InfiniteScroll
          dataLength={voiceModelList.length}
          next={() => {getPublishSquareToServer({isFirst: false})}}
          hasMore={hasMore}
          loader={<>
            {Array.from({ length: rowCount * 2 }, (_, i) => i).map((item, index) => (<VoiceModelItemSkeleton key={index} />))}
          </>}
          scrollableTarget="scrollableVoiceModelDiv"
          className="w-full self-stretch items-start grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6"
        >
          {voiceModelList.map((voice) => (
            <div key={voice.id}>
              <VoiceModelItem
                onItemClick={onItemClick}
                voice={voice}
                key={voice.id}
                type={type}
                isSelected={!!selectedVoiceModel && selectedVoiceModel.id === voice.id}
              />
            </div>
          ))}
        </InfiniteScroll>
      </ScrollShadow>
    </div>
  );
}

export default VoiceModelList;
