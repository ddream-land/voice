'use client'

import OSS from 'ali-oss'
import { customAlphabet } from 'nanoid'

type OssTokenDto = {
  data: {
    RequestId: string
    AssumedRoleUser: {
      Arn: string
      AssumedRoleId: string
    }
    Credentials: {
      SecurityToken: string
      AccessKeyId: string
      AccessKeySecret: string
      Expiration: string
    }
    Endpoint: string
    Region: string
    Bucket: string
  }
}

export function generateId() {
  /**
   * 需要 url 安全， html 安全的字符，也不能是 - ，因为协同要用
   * url 安全： $-_.+!*'(),
   * html 安全：-_
   */
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', 16)()
}

// export async function ossToken() {
//   const getOssTokenApi = getOssToken();
//   debugger
//   return await getOssTokenApi.send();
// }

export async function prepearOssClient(ossToken: any): Promise<[OSS, OssTokenDto]> {
  const token = ossToken
  const client = new OSS({
    region: token.data.Region,
    accessKeyId: token.data.Credentials.AccessKeyId,
    accessKeySecret: token.data.Credentials.AccessKeySecret,
    stsToken: token.data.Credentials.SecurityToken,
    bucket: token.data.Bucket,
    secure: true,
  })

  return [client, token]
}

export async function isExist(name: string, ossToken: any) {
  const [client, token] = await prepearOssClient(ossToken)

  try {
    await client.head(name);
    return true
  } catch (error: any) {
    if (error.code === 'NoSuchKey') {
      return false
    }
    return false
  }
}

export async function getModelJson(name: string, ossToken: any) {
  const [client, token] = await prepearOssClient(ossToken)

  try {
    const res = await client.list({
      prefix: `${name}/`,
      delimiter: '/',
      "max-keys": 100
    }, {});
    return true
  } catch (error: any) {
    if (error.code === 'NoSuchKey') {
      return false
    }
    return false
  }
}

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export async function uploadLive2dZip(file: File, ossToken: any): Promise<[string, string]> {
  const filename = file.name
  const modelname = filename.split('.')[0]
  if (!filename.endsWith('.zip') && !filename.endsWith('.ZIP') && !modelname) {
    throw new Error('Error.invalidfile')
  }

  const [client, token] = await prepearOssClient(ossToken)

  const newFilenameWithoutExt = generateId()
  const res = await client.put(`/nuwa/live2dzip/${newFilenameWithoutExt}.zip`, file)
  if (res.res.status !== 200) {
    throw new Error('Error.uploadfailed')
  }

  const base = `/nuwa/live2d/${newFilenameWithoutExt}`
  const live2dJsonUrl = `${base}/${modelname}/${modelname}.model3.json`
  await sleep(1000);
  if (!(await isExist(live2dJsonUrl, ossToken))) {
    throw new Error('Error.uploadfailed')
  }
  
  return [modelname, `${token.data.Endpoint}${live2dJsonUrl}`]
}

export async function uploadImage(file: File, ossToken: any): Promise<[string, string]> {
  const filename = file.name
  const modelname = filename.split('.')[0]
  const extName = filename.split('.')[1]

  const [client, token] = await prepearOssClient(ossToken)

  const newFilenameWithoutExt = generateId()
  const newFilenameFullUrl = `/nuwa/images/${newFilenameWithoutExt}.${extName}`
  const res = await client.put(newFilenameFullUrl, file)
  if (res.res.status !== 200) {
    throw new Error('Error.uploadfailed')
  }
  
  return [modelname, `${token.data.Endpoint}${newFilenameFullUrl}`]
}

export async function uploadFile(file: File, ossToken: any): Promise<[string, string]> {
  const filename = file.name
  const modelname = filename.split('.')[0]
  const extName = filename.split('.')[1]

  const [client, token] = await prepearOssClient(ossToken)

  const newFilenameWithoutExt = generateId()
  const newFilenameFullUrl = `/nuwa/images/${newFilenameWithoutExt}.${extName}`
  const res = await client.put(newFilenameFullUrl, file)
  if (res.res.status !== 200) {
    throw new Error('Error.uploadfailed')
  }
  
  return [modelname, `${token.data.Endpoint}${newFilenameFullUrl}`]
}
