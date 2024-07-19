import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const apiUrlList = {
  getSales: `/ddream/api/v1/finance/sales`,
  exchange: `/ddream/api/v1/finance/exchange`,
  getBags: '/ddream/api/v1/finance/get_bags',
}

export function getFinanceSales() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getSales,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}

export function financeExchange() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.exchange,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}

export function getFinanceBags() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getBags,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}