import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider,useMessages } from "next-intl";
import { AlterMessageContextProvider } from "@/app/ui/components/AlterMessageContextProvider";
import DashboardLayout from "@/app/ui/dashboard/DashboardLayout";

const locales = ["en"];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();
  
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <AlterMessageContextProvider>
          <DashboardLayout>
            <div className=" min-h-[80vh]">
              {children}
            </div>
          </DashboardLayout>
        </AlterMessageContextProvider>
      </NextIntlClientProvider>
    </>
  );
}
