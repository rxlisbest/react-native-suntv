import { post } from './request'
export function create(data) {
  post('sms/create', data).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error.getMessage())
  })
}