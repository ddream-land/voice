'use client'
import { useEffect, useState } from 'react'
import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'
import WholeNoteIcon from '@/app/icons/WholeNoteIcon'
import { DDLSidebar } from '@ddreamland/common'
import { cn, Skeleton } from '@nextui-org/react'
import VoiceAssetIcon from '@/app/icons/VoiceAssetIcon'
import { BeakerIcon } from '@heroicons/react/24/solid'
import DCubeIcon from '@/app/icons/3DCubeIcon'
import Send2Icon from '@/app/icons/Send2Icon'
import UserPanel from '../components/user-panel/UserPanel'
import { useExchangeDispatch } from '../components/exchange-modal/ExchangeContextProvider'
import { getFinanceBags } from '@/app/lib/finance.api'
import ExchangeBags from './ExchangeBags'

const navigation = [
  { name: 'Navigation.voiceasset', href: '/voiceasset', icon: VoiceAssetIcon, current: false },
  { name: 'Navigation.workstation', href: '/workstation', icon: BeakerIcon, current: false },
  { name: 'Navigation.myvoicemodels', href: '/myvoicemodels', icon: DCubeIcon, current: false },
  { name: 'Navigation.publishedvoices', href: '/publishedvoices', icon: Send2Icon, current: false },
]

export default function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  navigation.forEach((item) => {
    item.current = false
    if (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) {
      item.current = true
    }
  })


  const exchangeDispatch = useExchangeDispatch();

  const [initRenderClient, setInitRenderClient] = useState(false)
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
    setInitRenderClient(true)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 z-[49] w-full h-[82px] px-6 bg-zinc-800 justify-between items-center inline-flex">
        <div className="self-stretch justify-start items-center gap-6 flex">
          <div className=" w-[200px] z-40 rounded-lg flex-col justify-center items-center gap-2 inline-flex">
            <div className="rounded-lg justify-start items-center gap-3 inline-flex">
              <div
                className={`w-[320px] p-1 fixed top-0 left-0 bottom-0 pointer-events-none bg-transparent`}
              >
                {initRenderClient ? (
                  <DDLSidebar
                    lang="en"
                    title={{ name: 'Voice' }}
                    minifyTimeout={0}
                    forceSize={"mini"}
                  ></DDLSidebar>
                ) : (
                  <Skeleton className="rounded-full w-[216px] h-[72px]">
                    <div className="w-full h-full rounded-full bg-secondary"></div>
                  </Skeleton>
                )}
              </div>
            </div>
          </div>

          <div className="justify-start items-center gap-1 flex">
            {navigation.map((item, index) => (
              <div className="group/item" key={`${item.href}${index}`}>
                <Link
                  href={item.href}
                  className={cn(
                    item.current ? 'bg-neutral-900' : 'group-hover/item:bg-neutral-900',
                    ' px-4 py-3 rounded-xl justify-start items-center gap-2 flex'
                  )}
                >
                  <item.icon
                    className={cn(
                      item.current
                        ? 'fill-[#CEFF1C] stroke-[#CEFF1C]'
                        : 'group-hover/item:fill-[#CEFF1C] group-hover/item:stroke-[#CEFF1C] fill-zinc-400 stroke-zinc-400',
                      ' w-6 h-6 relative'
                    )}
                  />
                  <div
                    className={cn(
                      item.current ? 'text-[#CEFF1C]' : 'group-hover/item:text-[#CEFF1C] text-zinc-400',
                      " text-sm font-medium leading-tight"
                    )}
                  >
                    {t(item.name)}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="h-9 justify-end items-center gap-3 flex">
          <ExchangeBags />
          <div className="w-9 h-9 relative">
            <div className="w-9 h-9 left-0 top-0 absolute rounded-[40px] justify-center items-center inline-flex">
              {/* <HeaderAvatar /> */}
              <UserPanel />
            </div>
            <div className="w-3 h-3 left-[26px] top-[-2px] absolute bg-orange-400 rounded-full border-2 border-zinc-800" />
          </div>
        </div>
      </div>
    </>
  )
}
