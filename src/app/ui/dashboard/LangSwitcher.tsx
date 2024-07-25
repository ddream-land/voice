'use client'
import { usePathname, useRouter } from "@/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { useLocale, useTranslations } from 'next-intl';
import { setCookie } from "typescript-cookie";


export default function Header() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  
  return (
    <>
      <Tabs
        aria-label="Options"         
        selectedKey={locale}
        onSelectionChange={(key) => {
          router.replace(pathname, {locale: key as any});
          setCookie('i18next', key);
        }}
        classNames={{
          base: "",
          tabList: "h-10 rounded-3xl border border-[#323232] p-1 justify-center",
          tab:"w-8 h-8 rounded-full group-data-[selected=true]:bg-[#323232]",
          cursor: "rounded-full",
          tabContent: " rounded-full text-[#555555] group-data-[selected=true]:text-white",
        }}
      >
          <Tab key={'en'} title="En" />
          <Tab key={'zh-CN'} title="中" />
      </Tabs>
    {/* <Link
        href={pathname}
        locale='en'
        className={classNames(
          locale === 'en'
            ? 'bg-black text-white'
            : 'border-[#C5C5C5] border-t border-b border-l border-solid',
          'cursor-pointer h-10 w-10 flex items-center justify-center rounded-l-xl'
        )}>
          EN
      </Link>
    <Link
        href={pathname}
        locale='zh-CN'
        className={classNames(
          locale === 'zh-CN'
            ? 'bg-black text-white'
            : 'border-[#C5C5C5] border-t border-b border-r border-solid',
          'cursor-pointer h-10 w-10 flex items-center justify-center rounded-r-xl'
        )}>
          CN
      </Link> */}
    </>
  )
}
