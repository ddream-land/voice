'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import WholeNoteIcon from '@/app/icons/WholeNoteIcon'
import { useExchangeDispatch } from '../components/exchange-modal/ExchangeContextProvider'
import { getFinanceBags } from '@/app/lib/finance.api'

export default function ExchangeBags() {
  const t = useTranslations()

  const exchangeDispatch = useExchangeDispatch();

  const [isGetFinanceBagsing, setIsGetFianceBagsing] = useState(false)
  const [exchangeBags, setExchangeBags] = useState<number>(0)
  const getFinanceBagsApi = getFinanceBags()
  const getBagsApiServer = async () => {
    if (isGetFinanceBagsing) return
    setIsGetFianceBagsing(true)
    const res = await getFinanceBagsApi.send({});
    if (res && res.code === 0) {
      if (res.data && res.data['101']) {
        setExchangeBags(res.data['100'])
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
              exchangeDispatch({type: "close"});
            }
          },
        })
      }}>
        <WholeNoteIcon className="w-4 h-4 fill-green-500 stroke-green-500 relative" />
        <div className="text-center text-green-500 text-xs font-bold">
          {exchangeBags}
        </div>
      </div>
    </>
  )
}
