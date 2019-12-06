import { get, post } from './Request'

export function channelCategoryCreate(data) {
  return post('channels/create', data)
}