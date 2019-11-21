import Toast from 'react-native-root-toast'
import i18n from '../i18n'
let domain = process.env.API_DOMAIN

export async function post(url, data) {
  try {
    let response = await fetch(domain + url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (response.status.toString().search(/20[0-9]/) >= 0) {
      console.log(response.headers.get('content-type'))
      return response.json()
    } else {
      let error = await response.json()
      // Toast.show(error.message)
      return Promise.reject(error)
    }
  } catch (error) {
    Toast.show(i18n.t('error.network'))
  }
}