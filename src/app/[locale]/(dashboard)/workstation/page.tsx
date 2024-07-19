
import { PlayBtnContextProvider } from "@/app/ui/components/voice-preview/PlayButtonContextProvider";
import WorkStation from "@/app/ui/work-station/WorkStation";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function workStation() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <PlayBtnContextProvider>
          <WorkStation />
        </PlayBtnContextProvider>
      </NextIntlClientProvider>
    </>
  );
}
