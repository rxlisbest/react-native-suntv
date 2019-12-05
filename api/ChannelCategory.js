import { post } from './Request'

export function channelCategoryCreate(data) {
  return post('channel-categories/create', data)
}