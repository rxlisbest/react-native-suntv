import { get, post } from './Request'

export function channelCategoryCreate(data) {
  return post('channel-categories/create', data)
}

export function channelCategoryAll(){
  return get('channel-categories/all')
}

export function channelCategoryFamilyAll(params) {
  return get('channel-categories/family-all', params)
}