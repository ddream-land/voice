

const defaultLanguage = 'en';
const defaultSegmentationMethod = 'zh';
const defaultSpeed = 1;
const defaultMaxWords = 25;
const defaultSeed = -1;
const defaultTopK = 3;
const defaultTopP = 0.8;
const defaultTemperature = 0.8;

export const DefaultInstantGenerateParamster = {
  language: defaultLanguage,
  segmentationMethod: defaultSegmentationMethod,
  speed: defaultSpeed,
  maxWords: defaultMaxWords,
  seed: defaultSeed,
  topK: defaultTopK,
  topP: defaultTopP,
  temperature: defaultTemperature,
};

export type TypeInstantGenerateParamster = {
  language: string,
  segmentationMethod: string,
  speed: number,
  maxWords: number,
  seed: number,
  topK: number,
  topP: number,
  temperature: number,
};
