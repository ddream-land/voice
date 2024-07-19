import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const commonUrlList = {
  uploadFile: `/ddream/api/v1/common/upload_file`
}

export function uploadFileToServer(onUploadProgress: any) {
  const t = useTranslations();
  return baseApiHander({
    url: commonUrlList.uploadFile,
    isBody: true,
    isUpload: true,
    onUploadProgress: onUploadProgress
  })
}
