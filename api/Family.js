import { get, post, put, del } from './Request'

export function familyCreate(data) {
  return post('families/create', data)
}

export function familyAll(){
  return get('families/all')
}

export function familyIndex(){
  return get('families/index')
}

export function familyView(id) {
  return get('families/view/' + id)
}

export function familyUpdate(id, data) {
  return put('families/update/' + id, data)
}

export function familyDelete(id) {
  return del('families/delete/' + id)
}
