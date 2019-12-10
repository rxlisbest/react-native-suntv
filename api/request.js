import i18n from '../i18n'
let apiDomain = process.env.API_DOMAIN
let qiniuUploadDomain = process.env.QINIU_UPLOAD_DOMAIN
apiDomain = 'http://172.16.14.53:6060/'
qiniuUploadDomain = 'https://up-z1.qiniup.com/'
console.log(apiDomain)
console.log(qiniuUploadDomain)
import store from '../store/index'

async function request(method, url, data, domain) {
  domain = domain || apiDomain
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

export function post(url, data, domain) {
  return request('POST', url, data, domain)
}

export function get(url, params, domain) {
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
  return request('GET', url, undefined, domain)
}

export async function uploadQiniu(data) {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    const option = {
      method: 'POST',
      headers: headers,
      body: data,
    }

    let response = await fetch(qiniuUploadDomain, option)
    return response.json()
  } catch (error) {
    return Promise.reject(i18n.t('error.network'))
  }
}