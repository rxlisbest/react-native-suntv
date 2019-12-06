import i18n from '../i18n'
let domain = process.env.API_DOMAIN
import store from '../store/index'

async function request(method, url, data) {
  try {
    const token = store.getState().token || ''
    let headers = {}
    if (token) {
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    } else {
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    let option = {}
    if (data != undefined) {
      option = {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      }
    } else {
      option = {
        method: method,
        headers: headers,
      }
    }

    let response = await fetch(domain + url, option)
    if (response.status.toString().search(/20[0-9]/) >= 0) {
      switch (option.method) {
        case 'PUT':
          response = response.text()
          break;
        default:
          response = response.json()
      }
      return response
    } else {
      let error = await response.json()
      // Toast.show(error.message)
      return Promise.reject(error.message)
    }
  } catch (error) {
    return Promise.reject(i18n.t('error.network'))
  }
}

export function post(url, data) {
  return request('POST', url, data)
}

export function get(url, params) {
  if (params) {
    let paramsArray = [];
    //拼接参数  
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return request('GET', url)
}