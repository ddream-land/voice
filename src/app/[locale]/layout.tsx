import { Inter, Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';
import '@ddreamland/common/style.css'

const locales = ["en"];

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
      <body className={roboto.className}>
        <NextTopLoader showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}