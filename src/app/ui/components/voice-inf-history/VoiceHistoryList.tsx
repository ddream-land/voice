"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollShadow, } from "@nextui-org/react";
import VoiceHistoryItem from "./VoiceHistoryItem";
import VoiceHistoryItemSkeleton from "./VoiceHistoryItemSkeleton";
import { getVoiceInfHistory } from "@/app/lib/voice.api";
import EmptyIcon from "@/app/icons/EmptyIcon";
import { InfType, VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import { motion } from "framer-motion";
import { getUserToken } from "@/app/lib/user.api";

function VoiceHistoryList({
  type = 'audio',
  newInfList = [],
  onChange,
}: {
  type?: InfType;
  newInfList: Array<VoiceInfHistoryType>
  onChange?: (voiceList: VoiceInfHistoryType[]) => void;
}) {
  const t = useTranslations();

	const initVoiceList:Array<VoiceInfHistoryType> = []

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceList, setVoiceList] = useState<VoiceInfHistoryType[]>(initVoiceList);
  const [userToken, setUserToken] = useState("");
  const [getUserTokenLoading, setUserTokenLoading] = useState(false);
  const getVoiceInfHistoryApi = getVoiceInfHistory();
  const getUserTokenApi = getUserToken();

  const getUserTokenServer = async () => {
    if (getUserTokenLoading) {
      return;
    }
    setUserTokenLoading(true);

    const res = await getUserTokenApi.send({
      "page_token": nextPageToken,
      "inf_type": '',
    });
    if (res && res.code === 0) {
      setUserToken(res.data)
    }
    setUserTokenLoading(false);
  };

  const getVoiceInfHistoryoServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoiceInfHistoryApi.send({
      "page_token": nextPageToken,
      "inf_type": '',
    });
    if (res && res.code === 0) {
      let newVoiceList: VoiceInfHistoryType[] = res.data.list || [];
      setCount(count + newVoiceList.length);
      setVoiceList([...voiceList, ...newVoiceList]);
      setLoading(false);
      setHasMore(res.data.has_more)
      setNextPageToken(res.data.next_page_token)
    }
    setLoading(false);
    if (!isInit) {
      setInit(true);
    }
  };

  const loadMoreData = async () => {
    getVoiceInfHistoryoServer();
  };

  useEffect(() => {
    loadMoreData();
    getUserTokenServer();
  }, []);

  useEffect(() => {
    if (onChange && isInit) {
      onChange(voiceList);
    }
  }, [voiceList, isInit]);


  const wrapperVariants = {
    enter: { 
      y: -1*100 + '%',
      transition: {
        duration: 2
      }
    },
    visible: {
      y: 0*100 + '%',
      transition: {
        duration: 2
      }
    },
    exit: {
      y: 0*100 + '%',
      transition: {
        duration: 2
      }
    }
  };

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">

      {(count === 0 && isInit) && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-12">
          <div className="flex-col justify-center items-center gap-4 flex">
            <EmptyIcon className="w-12 h-12" />
            <div className="text-center text-zinc-500 text-sm font-medium ">The queue is empty<br/>Try to generate something</div>
          </div>
        </div>
      )}

			<ScrollShadow size={16} hideScrollBar id="scrollableVoiceHistoryDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-4">
				<InfiniteScroll
					dataLength={voiceList.length}
					next={loadMoreData}
					hasMore={hasMore}
					loader={<><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /></>}
					scrollableTarget="scrollableVoiceHistoryDiv"
					className="w-full self-stretch grow shrink basis-0 flex-col justify-start items-center gap-6 flex"
				>
          {newInfList.length > 0 ? (
            <>
              {[...newInfList, ...voiceList].map((voice, index) => (
                // <motion.div
                //   className="w-full"
                //   variants={wrapperVariants}
                //   initial="enter"
                //   animate='visible'
                //   exit="exit"
                //   key={`${index}-${voice.seq}-${voice.id}-${voice.inf_id}`} 
                // >
                  <VoiceHistoryItem userToken={userToken} voiceInfHistory={voice} key={`${index}-${voice.seq}-${voice.id}-${voice.inf_id}`} />
                // </motion.div>
              ))}
            </>
          ) : (
            <>
              {[...voiceList].map((voice, index) => (
                <VoiceHistoryItem userToken={userToken} voiceInfHistory={voice} key={`${index}-${voice.seq}-${voice.id}-${voice.inf_id}`} />
              ))}
            </>
          )}
				</InfiniteScroll>
			</ScrollShadow>
		</div>
  );
}

export default VoiceHistoryList;
