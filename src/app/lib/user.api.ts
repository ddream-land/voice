import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const apiUrlList = {
  getUserInfo: `/api/v1/user/info/get`,
  editUserInfo: `/api/v1/user/info/edit`,
}

export function getUserInfo({noLoginGotoLogin = false}: {noLoginGotoLogin?: boolean}) {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getUserInfo,
    mustLogin: true,
    noLoginGotoLogin: false,
  })
}

export function editUserInfo() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.editUserInfo,
    mustLogin: true,
    successMsg: t("User.edituserinfosuccess")
  })
}