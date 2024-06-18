import { redirect } from "@/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";


export default function Home() {
  const messages = useMessages();
  
  redirect(`/voiceasset`)

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <div></div>
      </NextIntlClientProvider>
    </>
  );
}
