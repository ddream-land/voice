'use client'
import { useRouter } from "@/navigation";
import { Avatar } from "@nextui-org/react";
import { useUser } from "@/app/contexts/UserContextProvider";
import { getIsLogin } from "@/app/lib/base.api";
import { useState } from "react";
import { useLocale } from "next-intl";
import { LoginModal } from "@ddreamland/common";

export default function HeaderAvatar() {
  const router = useRouter();
  const locale = useLocale();

  const user = useUser();
  const isLogin = getIsLogin();
  const [isOpen, setIsOpen] = useState(false);
  
  const gotoMePage = () => {
    router.push('/me');
  }
  return (
    <>
      <div onClick={() => {
        if (isLogin) {
          // gotoMePage()
        } else {
          debugger
          setIsOpen(true);
        }
      }} className="w-full h-full bg-zinc-800 rounded-full">
        <Avatar
          name={user?.name}
          src={user?.avatar}
          alt="avatar"
          className="h-full w-full"
          onClick={() => {
          }}
        />
      </div>
      <LoginModal
        isOpen={isOpen}
        locale={locale === 'en' ? 'en' : 'zh-CN'}
        onClose={() => {
          setIsOpen(false);
        }}
        onLogin={() => {
          setIsOpen(false);
          // gotoMePage()
        }}
      />
    </>
    
  )
}
