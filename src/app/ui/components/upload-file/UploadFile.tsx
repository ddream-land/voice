"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import Dropzone from 'react-dropzone'
import { uploadFileToServer } from "@/app/lib/common.api";
import { Spinner, Image, Progress } from "@nextui-org/react";
import { customAlphabet } from "nanoid";

export function generateId() {
  /**
   * 需要 url 安全， html 安全的字符，也不能是 - ，因为协同要用
   * url 安全： $-_.+!*'(),
   * html 安全：-_
   */
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', 16)()
}

function UploadFile({
  label,
  accept = "image",
  icon,
  fileName,
  fileNameIcon,
  onDone,
}: {
  label:ReactNode
  accept?: string
  icon?: ReactNode
  fileName?: ReactNode
  fileNameIcon?: ReactNode
  onDone?: ({url, file} :{url:string, file: any})=>void
}) {

  const [fileNameStr, setFileNameStr] = React.useState(fileName);
  const [fileUrl, setFileUrl] = useState("");

  const t = useTranslations();

  const [ isUploading, setIsUploading ] = useState(false);
  const [ isUnmount, setIsUnmount ] = useState(false);

  let initDropzoneAccept = {};
  if (accept === "image") {
    initDropzoneAccept = {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    }
  }
  if (accept === "audio") {
    initDropzoneAccept = {
      'audio/mp3': ['.mp3', '.wav', '.flac'],
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

  const uploadFileApi = uploadFileToServer((progressEvent: any) => {
    setLoaded(progressEvent.loaded);
    setTotal(progressEvent.total + 1);
  });

  const onDropHander = async (acceptedFiles: any) => {
    console.log(acceptedFiles)

    const file = acceptedFiles[0]; // 获取文件
    if (!file) return;

    const formData = new FormData(); // 创建FormData对象
    formData.append('file', file); // 将文件添加到FormData中
    if (accept === "image") {
      formData.append('type', 'picture')
    }
    if (accept === "audio") {
      formData.append('type', 'audio')
    }
    if (accept === "live2d") {
      formData.append('type', 'live2d')
    }

    const filename = file.name
    setFileNameStr(filename);
    // const modelname = filename.split('.')[0]
    // const extName = filename.split('.')[1]

    // const newFilenameWithoutExt = generateId()
    // const newFilename = `${newFilenameWithoutExt}.${extName}`

    try {
      setIsUploading(true)
      const response =  await uploadFileApi.send(formData)
      
      if (response.code === 0) {
        onDone && onDone({
          url: response.data.url,
          file: file,
        })
        setFileUrl(response.data.url)
      } else {
        setFileUrl('')
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
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      {fileNameStr ? (
        <>
          {accept !== "image" && (
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
          )}
          {accept === "image" && (
            <div className=" relative w-full h-full px-6 bg-zinc-800 rounded-xl justify-center items-center gap-3 inline-flex">
              { fileUrl && (
                <Image
                  alt={fileUrl}
                  classNames={{
                    wrapper: "h-full",
                    img: "h-full"
                  }}
                  src={fileUrl}
                />
              )}
              <div className=" absolute left-4 bottom-4 justify-start items-center gap-3 flex text-white text-base font-normal leading-normal">
                {fileNameIcon && (
                  <div className="w-6 h-6 justify-center items-center flex">
                    {fileNameIcon}
                  </div>
                )}
                <div className="text-slate-100 text-base font-normal leading-normal">
                  {fileNameStr}
                </div>
              </div>
              <div className=" absolute top-4 right-4">
              {isUploading ? (
                <Spinner />
                ) : (
                <div className=" cursor-pointer p-1 bg-white w-6 h-6 rounded-full justify-center items-center gap-2 flex">
                  <XMarkIcon className="h-4 w-4 fill-black stroke-black" onClick={() => {
                    setFileNameStr("")
                    setFileUrl("")
                  }} />
                </div>
              )}
              </div>
            </div>
          )}

          <div className="w-full absolute bottom-0 left-0">
            {loaded !== total && isUploading && (
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

export default UploadFile;
