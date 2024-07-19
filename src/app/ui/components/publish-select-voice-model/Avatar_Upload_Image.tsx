"use client"

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { uploadImage } from "@/app/lib/oss";
import { getOssToken } from "@/app/lib/oss.api";
import { Button } from "@nextui-org/react";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";

export default function Avatar_Upload_Image({onDone}:{onDone:(url:string)=>void}) {
  const t = useTranslations();

  const getOssTokenApi = getOssToken();

  const [ isUploading, setIsUploading ] = useState(false);
  const [ isUnmount, setIsUnmount ] = useState(false);
  const amDispatch = useAmDispatch();

  useEffect(() => {
    setIsUnmount(false);
    return () => {
      setIsUnmount(true);
    };
  }, [])
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setIsUploading(true)
    const ossToken = await getOssTokenApi.send({
      visitor: true,
    });
    if (file) {
      try {
        const res = await uploadImage(file, ossToken);
        if (!isUnmount) {
          onDone(res[1])
        }
      } catch(e:any) {
        amDispatch({
          type: "add",
          payload: t(e.message),
        })
        setIsUploading(false)
      }
    }
    
    setIsUploading(false)
  }

  return (
    <>
      <input
        accept=".jpg,.jpeg,.png"
        type="file"
        id="UploadInput"
        style={{ display: 'none' }}
        className="h-12 w-12"
        onChange={async (e) => {
          handleUpload(e)
        }}
      />
      <Button
        className="h-16 w-48 text-xl"
        color="primary"
        isLoading={isUploading}
        onClick={() => {
          const UploadInput = document.getElementById("UploadInput");
          if (UploadInput) {
            UploadInput.click();
          }
        }}
      >
        {t(`Character.avatarmodaladdbtn`)}
      </Button>
    </>
  );
}
