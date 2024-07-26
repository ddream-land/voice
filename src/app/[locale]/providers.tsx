// app/providers.tsx
"use client";

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { setBaseUrl } from "@ddreamland/common";

export function Providers({children}: { children: React.ReactNode }) {

  
  process.env.NEXT_PUBLIC_API_URL && setBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}