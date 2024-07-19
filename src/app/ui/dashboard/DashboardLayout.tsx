'use client';

import Header from "@/app/ui/dashboard/Header";
import { useRouter } from "@/navigation";
import { getUserInfo } from "@/app/lib/user.api";
import { getBags } from "@/app/lib/user.api";
import { useEffect, useState } from "react";
import { getIsLogin } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";
import { TypeUser } from "@/app/lib/definitions.user";
import { UserContextProvider } from "@/app/contexts/UserContextProvider";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUserInfoApi = getUserInfo({noLoginGotoLogin: true})

  const t = useTranslations();
  const [isInit, setIsInit] = useState(false);
  const isLogin = getIsLogin();

  const [userInfo, setUserInfo] = useState<TypeUser>({
    uid: '',
    name: '',
    email: '',
    wallet: '',
    avatar: ''
  });

  const getUserInfoServer = async () => {
    const res = await getUserInfoApi.send({});
    if (res && res.code === 0) {
      const user = {
        uid: res.data.uid,
        name: res.data.name,
        email: res.data.email,
        wallet: res.data.wallet,
        avatar: res.data.avatar
      } as TypeUser
      setUserInfo(user)
    }
  }

  useEffect(() => {
    if (!isInit && isLogin) {
      setIsInit(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await getUserInfoServer();
      setIsInit(false);
    }
    if (isInit) {
      init();
    }
    
  }, [isInit])

  return (
    <>
      <UserContextProvider value={userInfo}>
        <main>
          <Header />
          {children}
          {/* <div className="pb-10 pt-10">
            <Footer />
          </div> */}
        </main>
      </UserContextProvider>
    </>
  );
}
