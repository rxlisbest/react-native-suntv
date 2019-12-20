import { get, post, put } from './Request'

export function channelCategoryCreate(data) {
  return post('channel-categories/create', data)
}

export function channelCategoryAll(){
  return get('channel-categories/all')
}

export function channelCategoryFamilyAll(params) {
  return get('channel-categories/family-all', params)
}

export function channelCategoryFamilyIndex(params) {
  return get('channel-categories/family-index', params)
}

export function channelCategoryView(id) {
  return get('channel-categories/view/' + id)
}

export function channelCategoryUpdate(id, data) {
  return put('channel-categories/update/' + id, data)
}