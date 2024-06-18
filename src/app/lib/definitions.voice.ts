export type TypeVoiceModel = {
  id: number;
  src: string,
  name: string,
  count: number,
  star: boolean,
};

export type TypeVoice = {
  id: number;
  avatar: string,
  name: string,
  tone: string,
  content: string,
  voiceSrc: string,
  datetime: string,
  tags: string,
  type: 'API' | 'FILE'
};

export type TypeVoiceApi = {
  id: number;
  src: string,
  name: string,
  count: number,
};