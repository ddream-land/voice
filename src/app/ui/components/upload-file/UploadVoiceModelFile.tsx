"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import Dropzone from 'react-dropzone'
import { Progress, Spinner } from "@nextui-org/react";
import { customAlphabet } from "nanoid";
import { uploadModelFile } from "@/app/lib/voice.api";

export function generateId() {
  /**
   * 需要 url 安全， html 安全的字符，也不能是 - ，因为协同要用
   * url 安全： $-_.+!*'(),
   * html 安全：-_
   */
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', 16)()
}

function UploadVoiceModelFile({
  label,
  type,
  modelId,
  icon,
  fileName,
  fileNameIcon,
  onDone,
}: {
  label:ReactNode
  type: 'gpt_weights_file' | 'sovits_weights_file' | 'audio'
  modelId: string
  icon?: ReactNode
  fileName?: ReactNode
  fileNameIcon?: ReactNode
  onDone?: ({url, file} :{url:string, file: any})=>void
}) {

  const [fileNameStr, setFileNameStr] = React.useState(fileName);

  const t = useTranslations();

  const [ isUploading, setIsUploading ] = useState(false);
  const [ isUnmount, setIsUnmount ] = useState(false);

  let initDropzoneAccept = {};
  if (type === "audio") {
    initDropzoneAccept = {
      'audio/mp3': ['.mp3', '.wav', '.flac'],
    }
  }
  if (type === "gpt_weights_file") {
    initDropzoneAccept = {
      'file/ckpt': ['.ckpt'],
    }
  }
  if (type === "sovits_weights_file") {
    initDropzoneAccept = {
      'file/pth': ['.pth'],
    }
  }

  const [ dropzoneAccept, setDropzoneAccept ] = useState(initDropzoneAccept);
  const amDispatch = useAmDispatch();
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsUnmount(false);
    return () => {
      setIsUnmount(true);
    };
  }, [])

  const uploadModelFileApi = uploadModelFile((progressEvent: any) => {
    setLoaded(progressEvent.loaded);
    setTotal(progressEvent.total + 1);
  });

  const onDropHander = async (acceptedFiles: any) => {
    console.log(acceptedFiles)

    const file = acceptedFiles[0]; // 获取文件
    if (!file) return;

    if (modelId === '') {
      amDispatch({
        type: "add",
        payload: {
          message: t("PublishVoiceModel.uploadVoiceModelFileError"),
          type: "error",
        },
      })
      return
    }

    const formData = new FormData(); // 创建FormData对象
    if (type === 'gpt_weights_file') {
      formData.append('gpt_weights_file', file); // 将文件添加到FormData中
    }
    if (type === 'sovits_weights_file') {
      formData.append('sovits_weights_file', file); // 将文件添加到FormData中
    }
    if (type === 'audio') {
      formData.append('audio', file); // 将文件添加到FormData中
    }
    formData.append('model_id', modelId)

    const filename = file.name
    setFileNameStr(filename);

    try {
      setIsUploading(true)
      const response =  await uploadModelFileApi.send(formData)

      if (response.code === 0) {

        let url = '';
        if (type === 'gpt_weights_file') {
          url = response.data.gpt_url
        }
        if (type === 'sovits_weights_file') {
          url = response.data.sovits_url
        }
        if (type === 'audio') {
          url = response.data.audio_url
        }
        onDone && onDone({
          url: url,
          file: file,
        })
      } else {
        setFileNameStr('')
      }
      
      setIsUploading(false)
    } catch (error) {
      setIsUploading(false)
      amDispatch({
        type: "add",
        payload: "Error",
      })
    }
  }

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden">
      {fileNameStr ? (
        <>
          <div className="w-full h-full px-6 bg-zinc-800 rounded-xl justify-between items-center gap-3 inline-flex">
            <div className="justify-start items-center gap-3 flex text-slate-100 text-base font-normal leading-normal">
              {fileNameIcon && (
                <div className="w-6 h-6 justify-center items-center flex">
                  {fileNameIcon}
                </div>
              )}
              <div className="text-slate-100 text-base font-normal leading-normal">
                {fileNameStr}
              </div>
              
            </div>
            {isUploading ? (
              <Spinner />
            ) : (
              <div className=" cursor-pointer p-1 bg-black w-6 h-6 rounded-full justify-center items-center gap-2 flex">
                <XMarkIcon className="h-4 w-4 fill-white stroke-white" onClick={() => {
                  setFileNameStr("")
                }} />
              </div>
            )}
          </div>
          <div className="w-full absolute bottom-0 left-0">
            {loaded !== total &&  isUploading && (
              <Progress size="sm" aria-label="Loading..." value={loaded} maxValue={total} />
            )}
          </div>
        </>
      ): (
        <div className="w-full h-full">
          <Dropzone onDrop={onDropHander} accept={dropzoneAccept}>
            {({getRootProps, getInputProps}) => (
              <section className="w-full h-full">
                <div className="cursor-pointer w-full h-full p-4 rounded-2xl border-dashed border-2 border-zinc-700 flex-col justify-center items-center gap-2 inline-flex" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {icon}
                  <div className="text-center text-zinc-400 text-xs font-medium ">
                    {label}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
}

export default UploadVoiceModelFile;
