'use client'
import { useState } from "react";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from 'next-intl';
import HeaderAvatar from "./HeaderAvatar";
import FlashIcon from "@/app/icons/FlashIcon";
import { DDLSidebar } from "@ddreamland/common";
import { cn } from "@nextui-org/react";
import VoiceAssetIcon from "@/app/icons/VoiceAssetIcon";
import { BeakerIcon } from "@heroicons/react/24/solid";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import Send2Icon from "@/app/icons/Send2Icon";

const navigation = [
  { name: 'Navigation.voiceasset', href: '/voiceasset', icon: VoiceAssetIcon, current: false },
  { name: 'Navigation.workstation', href: '/workstation', icon: BeakerIcon, current: false },
  { name: 'Navigation.myvoicemodels', href: '/myvoicemodels', icon: DCubeIcon, current: false },
  { name: 'Navigation.publishedvoices', href: '/publishedvoices', icon: Send2Icon, current: false },
]

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
    navigation.forEach(item => {
      item.current = false;
      if (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) {
        item.current = true;
      }
    });
  const [showSidebar, setShowSidebar] = useState(false)
  
  return (
    <>
      {showSidebar && (
        <div className={`fixed left-6 top-0 pt-20 pb-14 w-[280px] z-50 h-screen`}>
          <div className="w-full h-full">
            <DDLSidebar lang="en" title={{name: 'STUDIO'}}></DDLSidebar>
          </div>         
        </div>
      )}
      <div className="fixed top-0 left-0 z-[60] w-full h-[82px] px-6 bg-zinc-800 justify-between items-center inline-flex">
        <div className="self-stretch justify-start items-center gap-6 flex">
          <div className="rounded-lg flex-col justify-center items-center gap-2 inline-flex">
            <div className="py-2 rounded-lg justify-start items-center gap-3 inline-flex">
              {/* <div
                onClick={() => setShowSidebar(!showSidebar)}
                className="px-4 py-2 bg-zinc-900 rounded-3xl justify-start items-center gap-3 flex"
              >
                <LogoIcon className="" />
                <HeaderArrowIcon className="" />
              </div> */}
              
              <div className="w-[166px] h-[58px]">
                <DDLSidebar lang="en" title={{name: 'Studio'}} minifyTimeout={0}></DDLSidebar>
              </div>
      
              <div className="text-slate-100 text-lg font-semibold font-['Inter'] leading-7 text-nowrap">Voice Studio</div>
            </div>
          </div>

          <div className="w-[2px] h-[27px] bg-white/10"></div>

          <div className="justify-start items-center gap-1 flex">
          {navigation.map((item, index) => (
              <div className="group/item" key={`${item.href}${index}`}>
                <Link
                  href={item.href}
                  className={cn(
                    item.current
                      ? 'bg-neutral-900'
                      : 'group-hover/item:bg-neutral-900',
                    ' px-4 py-3 rounded-xl justify-start items-center gap-2 flex'
                  )}
                >
                  <item.icon
                    className={cn(
                      item.current
                        ? 'fill-white stroke-white'
                        : 'group-hover/item:fill-white group-hover/item:stroke-white fill-zinc-400 stroke-zinc-400',
                      ' w-6 h-6 relative'
                    )}
                  />
                  <div
                    className={cn(
                      item.current
                        ? 'text-white'
                        : 'group-hover/item:text-white text-zinc-400',
                      " text-sm font-medium font-['Inter'] leading-tight"
                    )}
                  >{t(item.name)}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="h-9 justify-end items-center gap-3 flex">
          <div className="rounded-lg justify-center items-center gap-0.5 flex">
            <FlashIcon className="w-4 h-4 fill-green-500 stroke-green-500 relative" />
            <div className="text-center text-green-500 text-xs font-bold font-['Inter'] leading-normal">255</div>
          </div>
          <div className="w-9 h-9 relative">
            <div className="w-9 h-9 left-0 top-0 absolute rounded-[40px] justify-center items-center inline-flex">
              <HeaderAvatar />
            </div>
            <div className="w-3 h-3 left-[26px] top-[-2px] absolute bg-orange-400 rounded-full border-2 border-zinc-800" />
          </div>
        </div>
      </div>
    </>
    
  )
}
