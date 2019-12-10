import { get, post, uploadQiniu } from './Request'

export function fileUpToken(params) {
  return get('files/up-token', params)
}

export function fileUpload(data) {
  return uploadQiniu(data)
}

export function fileCreate(data) {
  return post('files/create', data)
}