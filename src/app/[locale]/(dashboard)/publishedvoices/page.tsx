
import WorkStation from "@/app/ui/work-station/WorkStation";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function publishedVoices() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <WorkStation />
      </NextIntlClientProvider>
    </>
  );
}
