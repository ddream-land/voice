

import { PlayBtnContextProvider } from "@/app/ui/components/voice-preview/PlayButtonContextProvider";
import VoiceAsset from "@/app/ui/voice-asset/VoiceAsset";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function voiceAsset() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <PlayBtnContextProvider>
          <VoiceAsset />
        </PlayBtnContextProvider>
      </NextIntlClientProvider>
    </>
  );
}
