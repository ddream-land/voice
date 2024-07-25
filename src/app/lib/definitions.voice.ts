const defaultLanguage = 'auto';
const defaultSegmentationMethod = 'auto_cut';
const defaultSpeed = 1;
const defaultMaxWords = 50;
const defaultSeed = -1;
const defaultTopK = 5;
const defaultTopP = 0.8;
const defaultTemperature = 0.8;

export type InstantGenerateParamsterType = {
  publish_id: string,
  model_id: string,
  inf_type: "audio" | "code",
  text: string,
  basic_params: VoiceModelBasicParamsType,
  advance_params: VoiceModelAdvancedParamsType,
  tone: VoiceModelToneType,
  price: number
  code: string
}

export type VoiceInfHistoryType = {
  id: string
  audio_url: string
  inf_id: string
  created_at: string
  name:string
  cover_url: string
  seq: number,
  code: Array<{
    code: string,
    type: string,
  }>
} & InstantGenerateParamsterType;

export const DefaultVoiceModelFormData: VoiceModelFormDataProps = {
  model_id: '',
  publish_type: 2,
  local_model: {
    type: "shide",
    "gpt-weights_url": "",
    "sovits-weights_url": ""
  },
  basic_params: {
    language: defaultLanguage
  },
  tone: [],
  publish_info: {
    cover_url: "",
    name: "",
    type: "",
    tag: [],
    desc: "",
    source: "original",
    permission: {
      credit_free: true,
      reprint_allowed: true,
      download_permission: true,
      modification_allowed: true,
      permission_change_allowed: true,
      commercial_license: true
    }
  }
}


export type VoiceModelFormDataProps = {
  model_id: string
  publish_type: 1 | 2
  local_model: {
    type: string
    "gpt-weights_url": string
    "sovits-weights_url": string
  },
  basic_params: {
    language: string
  },
  tone:  Array<VoiceModelToneType>,
  publish_info: VoicePublishInfoType
}

export const DefaultVoiceModelBasicParams = {
  language: defaultLanguage,
  seg_method: defaultSegmentationMethod,
  speed: defaultSpeed,
  m_w_a_p_s: defaultMaxWords,
};

export type VoiceModelBasicParamsType = {
  language: string
  speed: number
  seg_method: string
  "m_w_a_p_s": number
}

export const DefaultVoiceModelAdvancedParams = {
  seed: defaultSeed,
  top_k: defaultTopK,
  top_p: defaultTopP,
  temperature: defaultTemperature,
};

export type VoiceModelAdvancedParamsType = {
  seed: number
  top_k: number
  top_p: number
  temperature: number
}

export type VoiceModelToneType = {
  tone_type: string
  audio_url: string
  text: string
}

export type VoicePublishInfoType = {
  cover_url: string
  name: string
  type: string
  tag: Array<string>
  desc: string
  source: string
  permission: VoiceModelPermissionType
}

export type VoiceModelPermissionType = {
  credit_free: boolean
  reprint_allowed: boolean
  download_permission: boolean
  modification_allowed: boolean
  permission_change_allowed: boolean
  commercial_license: boolean
}

export type VoiceModelPublishType = {
  like: boolean,
  id: string,
  created_at: string,
  publish_info: VoicePublishInfoType
  publish_id: string
  tone: Array<VoiceModelToneType>,
  model_id: string
  publish_type: 1 | 2
  star_num: number
  d_num: number
  inf_num: number
  seq: number
  local_model: {
    type: string
    "gpt-weights_url": string
    "sovits-weights_url": string
  },
  basic_params: {
    language: string
  },
  publisher: VoiceModelPublisher
}

export type VoiceModelPublisher = {
  UserBusiPO: {
    down_load: number
    run: number
    starts: number
  },
  UserPO: {
    avatar: string
    name: string
    created_at: string
  }
}

export type VoiceModelFilterType = {
  type: "gril" | "boy" | "male" | "female" | "collection" | "browse" | ""
  name: string
};

export type InfType = 'audio' | 'code';

export type VoiceModelType = {
  id: number;
  src: string,
  name: string,
  count: number,
  star: boolean,
  publish_id: string,
  model_id: string,
  tone: Array<VoiceModelToneType>,
};

export type TypeVoiceApi = {
  id: number;
  src: string,
  name: string,
  count: number,
};

export type voiceTrainRecordType = {
  id: string
  task_id: string
  task_name: string
  status: number
  result: number,
  retrain: boolean,
  task_param: {
    model_id: string,
  }
}

export type VoiceModelInfoType = {
  id: string,
  model_id: string,
  slicer: Array<VoiceModelToneType>
}