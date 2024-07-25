'use client'
import { useState } from "react";
import { useAmDispatch } from "@/app/ui/components/alter-message/AlterMessageContextProvider";
import { useLocale, useTranslations } from "next-intl";
import { getCookie, removeCookie } from 'typescript-cookie'
import { useLoginDispatch } from "@ddreamland/common";
import axios from "axios";
import { useExchangeDispatch } from "../ui/components/exchange-modal/ExchangeContextProvider";
import { getFinanceBags } from "./finance.api";

export const NUWAUID = "nuwa_uid"
export const NUWASESSION = "nuwa_session"
export const I18N_LOCALE = "i18next";
export const NEXT_LOCALE = "NEXT_LOCALE";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const stBaseUrl = process.env.NEXT_PUBLIC_ST_API_URL;

export const getIsLogin = () => {
  if (typeof document !== "undefined") {
    const uid = getCookie(NUWAUID)
    const session = getCookie(NUWASESSION)
    return !!(uid && session)
  }
  return false;
}

export const deleteLoginCookie = () => {
  removeCookie(NUWAUID)
  removeCookie(NUWASESSION)
}

export const getI18n = () => {
  if (typeof document !== "undefined") {
    const i18nLocale = getCookie(I18N_LOCALE);
    const nextLocale = getCookie(NEXT_LOCALE);
    if (i18nLocale) {
      return i18nLocale;
    }
    if (nextLocale) {
      return nextLocale
    }
  }
  return 'zh-CN';
};


export const baseApiHander = ({
  url,
  mustLogin = false,
  noLoginGotoLogin = false,
  isSt = false,
  successMsg,
  isBody = false,
  isUpload = false,
  onUploadProgress,
}: {
  url: string
  mustLogin?: boolean
  noLoginGotoLogin?: boolean
  isSt?: boolean
  successMsg?: string
  isBody?: boolean
  isUpload?: boolean
  onUploadProgress?: (progressEvent: any) => void
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const loginDispatch = useLoginDispatch();
  const exchangeDispatch = useExchangeDispatch();
  const [loading, setLoading] = useState(false);
  const amDispatch = useAmDispatch();
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(function (response) {
    const data = response.data;
    if (data.code === 0) {
      successMsg && amDispatch({
        type: "add",
        payload: {
          message: successMsg,
          type: "success"
        },
      })
      setLoading(false)
    }
    
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(function (response) {
    const data = response.data;

    // session 过期
    if (data.code === 604) {
      if(noLoginGotoLogin) {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: false,
            locale: getI18n(),
            onLogin: () => {
              loginDispatch({type: "close"});
              window.location.reload();
            }
          },
        })
      }
      setLoading(false)
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(function (response) {
    const getBagsApiServer = async () => {
      const getFinanceBagsApi = getFinanceBags()
      const res = await getFinanceBagsApi.send({});
      if (res && res.code === 0) {
        if (res.data && res.data['101']) {
          exchangeDispatch({
            type: 'set',
            payload: res.data['101'] || 0
          })
        }
      }
    }
    const data = response.data;

    // 虚拟货币不足
    if (data.code === 7003) {
      amDispatch({
        type: "add",
        payload: {
          message: data.msg
        },
      })
      exchangeDispatch({
        type: 'open',
        payload: {
          onClose: () => {
            getBagsApiServer();
            exchangeDispatch({type: "close"});
          },
          onSuccess: () => {
            getBagsApiServer();
          }
        },
      })

      setLoading(false)
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(function (response) {
    const data = response.data;

    if (![0, 604, 7003].includes(data.code)) {
      amDispatch({
        type: "add",
        payload: {
          message: data.msg
        },
      })

      setLoading(false)
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  const send = async (params?: any) => {
    const apiUrl = isSt ? stBaseUrl : baseUrl;
    const isLogin = getIsLogin();
    setLoading(true);
    let fetchUrl = `${apiUrl}${url}`;
    if (mustLogin) {
      const uid = getCookie(NUWAUID)
      const session = getCookie(NUWASESSION)
      if (!uid || !session) {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: false,
            locale: getI18n(),
            onLogin: () => {
              loginDispatch({type: "close"});
              window.location.reload();
            }
          },
        })
        return;
      }
      fetchUrl = `${apiUrl}${url}?${new URLSearchParams({
        uid: uid,
        session: session,
      }).toString()}`;
    }
    
    try {
      let fetchParams = {
        method: 'POST',
        data: isBody ? params : JSON.stringify(params),
        headers: {
          'Accept-Language': locale
        } as any,
        onUploadProgress: (progressEvent: any) => {
          onUploadProgress && onUploadProgress(progressEvent)
        },
      }

      if (!isUpload) {
        fetchParams.headers['Content-Type'] = 'application/json'
      }
      
      const response = await axiosInstance(fetchUrl, fetchParams);
      
      setLoading(false)
      return response.data;
    } catch (e) {
      amDispatch({
        type: "add",
        payload: {
          message: t("Error.sysfail")
        },
      })
      setLoading(false)
    }    
  }

  return { loading, send };
}