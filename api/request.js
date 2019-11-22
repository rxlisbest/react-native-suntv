import Toast from 'react-native-root-toast'
import i18n from '../i18n'
let domain = process.env.API_DOMAIN

export async function post(url, data) {
  try {
    const option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
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
      return Promise.reject(error)
    }
  } catch (error) {
    Toast.show(i18n.t('error.network'))
  }
}