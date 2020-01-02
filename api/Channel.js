import { get, post, put, del } from './Request'

export function channelCreate(data) {
  return post('channels/create', data)
}

export function channelIndex(params) {
  return get('channels/index', params)
}

export function channelView(id) {
  return get('channels/view/' + id)
}

export function channelFamilyIndex(params) {
  return get('channels/family-index', params)
}

export function channelUpdate(id, data) {
  return put('channels/update/' + id, data)
}

export function channelDelete(id) {
  return del('channels/delete/' + id)
}