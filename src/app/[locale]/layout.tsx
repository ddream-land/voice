import { Roboto, } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';
import '@ddreamland/common/style.css'
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const pingFangSCFont = localFont({ src: '../../../public/fonts/PingFangSC-Regular.woff2' })

const locales = ["en", "zh-CN"];

const roboto = Roboto({ weight: '400', subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={locale === 'en' ? roboto.className : pingFangSCFont.className}>
        <NextTopLoader showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}