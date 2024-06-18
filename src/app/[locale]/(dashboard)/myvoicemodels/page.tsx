import MyVoiceModels from "@/app/ui/myvoicemodels/MyVoiceModels";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function myVoiceModels() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <MyVoiceModels />
      </NextIntlClientProvider>
    </>
  );
}
