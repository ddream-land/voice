import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Button,
  Divider,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Auth, DDLPay } from '@ddreamland/common'
import { useUser } from '@/app/contexts/UserContextProvider'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import numbro from "numbro";
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { useRouter } from "@/navigation";
import { useAmDispatch } from '../alter-message/AlterMessageContextProvider'
import { getBags } from '@/app/lib/user.api'
import { useLocale, useTranslations } from 'next-intl'


type UserPanelProps = {
  className?: string
}

export default function UserPanel({ className }: UserPanelProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const {
    isOpen: payIsOpen,
    onOpen: openPay,
    onOpenChange: onPayOpenChange,
  } = useDisclosure({ defaultOpen: false })
  const {
    isOpen: dropdownIsOpen,
    onOpen: openDropdown,
    onClose: closeDropdown,
  } = useDisclosure({ defaultOpen: false, onChange: (isOpen) => {
      if (isOpen) {
        getBagsApiServer();
      }
    }
  });
  const [isLogouting, setIsLogouting] = useState(false)
  const [isGetBagsing, setIsGetBagsing] = useState(false)
  const [bags, setBags] = useState(0)
  const getBagsApi = getBags()


  const getBagsApiServer = async () => {
    if (isGetBagsing) return
    setIsGetBagsing(true)
    const res = await getBagsApi.send({});
    if (res && res.code === 0) {
      if (res.data && res.data['100']) {
        setBags(res.data['100'])
      }
    }

    setIsGetBagsing(false)
  }

  const onPaymentComplete = () => {
    getBagsApiServer();
  }
  

  const userInfo = useUser();
  // const useDispatch = useAppDispatch()

  async function onAvatarClicked() {
    closeDropdown()
    if (Auth.isLogin) {
      openDropdown()
    } else {
      // await useDispatch(logout())
    }
  }

  async function onLogoutClicked() {
    setIsLogouting(true)
    try {
      await Auth.logout();
    } catch {
    } finally {
      setIsLogouting(false)
      closeDropdown()
    }

    if (Auth.isLogin) {

    } else {
      router.push('/');
    }
  }

  async function onTopUpClicked() {
    closeDropdown()
    openPay()
  }

  const usertype = 'Power user'
  const userExpire = '120 days left'

  // useEffect(
  //   function () {
  //     if (minify) {
  //       closeDropdown()
  //     }
  //   },
  //   [minify]
  // )

  useEffect(function () {
    getBagsApiServer()

    window.addEventListener('click', closeDropdown)

    return function () {
      window.removeEventListener('click', closeDropdown)
    }
  }, [])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      className={`relative cursor-pointer pointer-events-auto`}
    >
      <Popover
        isOpen={dropdownIsOpen}
        placement="bottom-end"
        classNames={{
          base: "p-0 w-[300px] ", // change arrow background
          content: "p-4 bg-zinc-800 rounded-2xl shadow",
        }}
  
      >
        <PopoverTrigger>
          <Avatar
            name={userInfo?.name}
            onClick={onAvatarClicked}
            showFallback
            src={userInfo.avatar}
            className="w-[46px] h-[46px] z-0"
            radius="full"
          ></Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox
            aria-label="User Profile"
            classNames={{
              base: "p-0",
              list: "gap-4"
            }}
          >
            <ListboxItem
              key="profile"
              textValue="profile"
              className="p-0 cursor-default data-[hover=true]:bg-transparent"
              isReadOnly
            >
              <div className='flex flex-row justify-between items-center'>
                <div className={`h-[46px] flex flex-row grow shrink overflow-hidden`}>
                  <Avatar
                    name={userInfo?.name}
                    onClick={onAvatarClicked}
                    showFallback
                    src={userInfo.avatar}
                    className="w-[46px] h-[46px]"
                    radius="full"
                  ></Avatar>
                  <div
                    className={`ml-[10px] flex-1 overflow-hidden flex flex-col justify-center shrink-1 gap-1`}
                  >
                    <div className={`flex flex-row items-center`}>
                      <span className={`text-white text-[16px] font-bold truncate`}>
                        {userInfo.name}
                      </span>
                      <span className={`w-[16px] h-[16px] flex-none`}></span>
                    </div>
                    <div className={`text-zinc-400 text-xs truncate`}>
                      {userInfo.uid}
                    </div>
                    {/* <div className={`flex flex-row items-center`}>
                      <span className={`text-[#FFB240] text-[12px] font-[500]`}>{usertype}</span>
                      <div className={`w-[1px] h-[4px] bg-[#36383E] mx-1`}></div>
                      <span className={`text-[#5e5f62] text-[12px] font-[400]`}>
                        {` ${userExpire}`}
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className="h-full flex flex-row shrink-0 grow-0 cursor-pointer">
                  <div className="text-zinc-400 text-xs font-normal leading-none">{t("UserPanel.profile")}</div>
                  <ChevronRightIcon className="w-3 h-3 fill-zinc-400" />
                </div>
              </div>
            </ListboxItem>
            <ListboxItem
              key="wallet"
              textValue="wallet"
              isReadOnly
              className="w-full p-0 cursor-default"
            >
              <div
                className={`w-full h-[98px] rounded-xl border border-white px-4 py-3 flex flex-col justify-between bg-[url('/imgs/wallet-bg.png')] bg-cover`}
              >
                <div className="text-white text-sm font-medium leading-tight">{t("UserPanel.balance")}</div>
                <div className={`flex flex-row justify-between items-end`}>
                  <div className='flex flex-col justify-center items-start'>
                    <div className="text-white text-2xl font-bold leading-loose">
                      {numbro(bags).format({
                        thousandSeparated: true,
                      })}
                    </div>
                    <div className="opacity-75 text-white text-xs font-normal leading-none">{t("UserPanel.dreamToken")}</div>
                  </div>
                  <Button
                    onClick={onTopUpClicked}
                    variant='flat'
                    size='sm'
                    className={`bg-white/10 w-[66px] rounded-full`}
                  >
                    {t("UserPanel.topUp")}
                  </Button>
                </div>
              </div>
            </ListboxItem>
            <ListboxItem
              key="logout"
              textValue="Logout"
              className="h-14"
              startContent={<ArrowRightStartOnRectangleIcon className='w-5 h-5' />}
              onClick={onLogoutClicked}
            >
              {t("UserPanel.logout")}
            </ListboxItem>
          </Listbox>  
        </PopoverContent>
      </Popover>

      <DDLPay
        isOpen={payIsOpen}
        onOpenChange={onPayOpenChange}
        onPaymentComplete={onPaymentComplete}
        lang={locale as any}
      />

      <div className={`w-[16px] h-[16px] absolute bottom-0 -right-1`}></div>
    </div>
  )
}
