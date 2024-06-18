import { baseApiHander } from "@/app/lib/base.api";

const apiUrlList = {
  getOssToken: `/api/sts/get`,
}

export function getOssToken() {
  return baseApiHander({
    url: apiUrlList.getOssToken,
    isSt: true
  })
}