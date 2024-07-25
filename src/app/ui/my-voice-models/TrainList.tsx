"use client";
import React, { useEffect, useRef, useState } from "react";
import TrainItem from "./TrainItem";
import { Button, Input, Pagination } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteVoiceTrain, getVoiceTrainRecords } from "@/app/lib/voice.api";
import { voiceTrainRecordType } from "@/app/lib/definitions.voice";
import TrainItemSkeleton from "./TrainItemSkeleton";
import { useTranslations } from "next-intl";

const TaskStatusMap = {
  '1': 'notstart',
  '2': 'completing',
  '3': 'completed',
}
const TaskResultMap = {
  '1': 'success',
  '2': 'failed',
}

function TrainList({
  onChange,
}:{
  onChange: (voiceTrainRecordsList: []) => void;
}) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [voiceTrainRecordsList, setVoiceTrainRecordsList] = useState<voiceTrainRecordType[]>([]) 
  const [total, setTotal] = useState(0)
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage)
  const [search, setSearch] = useState('')
  const searchRef = useRef(search)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleting, setDeleting] = useState(false)

  const getVoiceTrainRecordsApi = getVoiceTrainRecords();
  const deleteVoiceTrainApi = deleteVoiceTrain();
  
  const getVoiceTrainRecordsServer = async ({
    page,
    search,
    isRefresh = false,
  }: {
    page?: number,
    search?: string,
    isRefresh?: boolean,
  }) => {
    if (loading) {
      return;
    }
    !isRefresh && setLoading(true);
    const res = await getVoiceTrainRecordsApi.send({
      page_size: pageSize,
      page: page,
      search: search,
    });
    if (res && res.code === 0) {
      setVoiceTrainRecordsList(res.data.list);
      setTotal(res.data.total);
      onChange(res.data.list);
      setLoading(false);
    }
    setLoading(false);
  };

  const deleteVoiceTrainServer = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    const res = await deleteVoiceTrainApi.send({
      ids: selectedIds
    });
    if (res && res.code === 0) {
      getVoiceTrainRecordsServer({
        page: 1,
        search: search,
      });
      setSelectedIds([])
    }
    setDeleting(false);
  };

  useEffect(() => {
    currentPageRef.current = currentPage
    searchRef.current = search
  })

  useEffect(() => {
    getVoiceTrainRecordsServer({
      page: 1,
      search: '',
    });

    const gvtInterval = setInterval(() => {
      getVoiceTrainRecordsServer({
        page: currentPageRef.current,
        search: searchRef.current,
        isRefresh: true,
      })
    }, 10*1000)

    return (() => {
      clearInterval(gvtInterval)
    })
  }, []);
  
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full h-12 justify-between items-center inline-flex">
        <Input
          classNames={{
            base: 'w-[400px]',
            inputWrapper: 'h-10'
          }}
          startContent={<MagnifyingGlassIcon className="w-6 h-6" />}
          type="text"
          variant="bordered"
          color="default"
          placeholder={t("MyVoiceModels.searchPlaceholder")}
          size="sm"
          value={search}
          onChange={(e) => {
            getVoiceTrainRecordsServer({
              page: 1,
              search: e.target.value,
            });
            setCurrentPage(1)
            setSearch(e.target.value)}
          }
        />
        {selectedIds.length > 0 && (
          <Button
            color="danger"
            startContent={<TrashIcon className="w-5 h-5" />}
            isDisabled={selectedIds.length === 0}
            onPress={deleteVoiceTrainServer}
          >{t("Button.delete")}</Button>
        )}
        
      </div>
      

      {loading ? (
        <>
          {Array.from({ length: pageSize }, (_, i) => i).map((item, index) => (<TrainItemSkeleton key={index} />))}
        </>
      ) : (
        <>
          {voiceTrainRecordsList.map((item) => (
            <TrainItem
              key={item.id}
              value={item}
              isSelected={selectedIds.includes(item.task_id)}
              onValueChange={(checked) => {
                if (checked) {
                  setSelectedIds([
                    ...selectedIds,
                    item.task_id,
                  ])
                } else {
                  setSelectedIds(selectedIds.filter((id) => id !== item.task_id))
                }
              }}
              onRetrain={() => {
                getVoiceTrainRecordsServer({
                  page: currentPageRef.current,
                  search: searchRef.current,
                  isRefresh: true,
                })
              }}
            />
          ))}
        </>
      )}

      <div className="w-full h-8 justify-between items-center inline-flex">
        <div className="text-zinc-400 text-sm font-normal leading-tight">
          {(currentPage-1)*pageSize+1}-{currentPage === Math.ceil(total/pageSize) ? total : pageSize*currentPage} {t("Pagination.of")} {total} {t("Pagination.items")}
        </div>
        {total > 0 && (
          <Pagination total={ Math.ceil(total/pageSize) } page={currentPage} onChange={(page)=> {
            getVoiceTrainRecordsServer({
              page: page,
              search: search,
            });
            setCurrentPage(page)
          }} />
        )}
      </div>
    </div>
  );
}

export default TrainList;
