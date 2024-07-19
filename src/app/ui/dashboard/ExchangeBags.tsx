'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import WholeNoteIcon from '@/app/icons/WholeNoteIcon'
import { useExchange, useExchangeDispatch } from '../components/exchange-modal/ExchangeContextProvider'
import { getFinanceBags } from '@/app/lib/finance.api'

export default function ExchangeBags() {
  const t = useTranslations()

  const exchangeDispatch = useExchangeDispatch();
  const exchange = useExchange();

  const [isGetFinanceBagsing, setIsGetFianceBagsing] = useState(false)
  const getFinanceBagsApi = getFinanceBags()
  const getBagsApiServer = async () => {
    if (isGetFinanceBagsing) return
    setIsGetFianceBagsing(true)
    const res = await getFinanceBagsApi.send({});
    if (res && res.code === 0) {
      if (res.data && res.data['101']) {
        // setExchangeBags(res.data['101'])
        exchangeDispatch({
          type: 'set',
          payload: res.data['101']
        })
      }
    }

    setIsGetFianceBagsing(false)
  }

  useEffect(() => {
    getBagsApiServer();
  }, [])

  return (
    <>
      <div className="rounded-lg justify-center items-center gap-0.5 flex px-2 cursor-pointer" onClick={() => {
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
      }}>
        <WholeNoteIcon className="w-4 h-4 fill-green-500 stroke-green-500 relative" />
        <div className="text-center text-green-500 text-xs font-bold">
          {exchange.value}
        </div>
      </div>
    </>
  )
}
