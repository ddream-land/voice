

import VoiceAsset from "@/app/ui/voice-asset/VoiceAsset";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function voiceAsset() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <VoiceAsset />
      </NextIntlClientProvider>
    </>
  );
}
