import { post } from './request'
export function create(data) {
  post('sms/create', data).then(res => {
  }).catch(error => {
    console.log(error)
  })
}