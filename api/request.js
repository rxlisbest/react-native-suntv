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
    }).then((response) => {
      return response.json()
    })
    return response
  } catch (error) {
    Toast.show(i18n.t('error.network'))
  }
}