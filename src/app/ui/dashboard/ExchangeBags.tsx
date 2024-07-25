'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import WholeNoteIcon from '@/app/icons/WholeNoteIcon'
import { useExchange, useExchangeDispatch } from '../components/exchange-modal/ExchangeContextProvider'
import { getFinanceBags } from '@/app/lib/finance.api'
import { Button } from '@nextui-org/react'

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
      } else {
        exchangeDispatch({
          type: 'set',
          payload: 0
        })
      }
    }

    setIsGetFianceBagsing(false)
  }

  const openExchangeModal = () => {
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
  }

  useEffect(() => {
    getBagsApiServer();
  }, [])

  return (
    <>
      <div
        className="justify-center items-center gap-2 flex px-2 cursor-pointer"
        onClick={() => {
          openExchangeModal();
        }}
      >
        <div className='ustify-center items-center gap-0.5 flex'>
          <WholeNoteIcon className="w-4 h-4 fill-green-500 stroke-green-500 relative" />
          <div className="text-center text-green-500 text-xs font-bold">
            {exchange.value}
          </div>
        </div>
        <Button size='sm' variant='ghost' color="primary" onPress={openExchangeModal} >{t("ExchangeBags.exchangeButton")}</Button>
      </div>
    </>
  )
}
