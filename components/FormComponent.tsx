import ValidationComponent from 'react-native-form-validator';
import i18n from '../i18n'

const messages = i18n.t('messages')
const rules = {
  cellphone: /^1[3456789]\d{9}$/
}

export default class FormComponent extends ValidationComponent {

  messages = {
    i18n: i18n.t('messages')
  }

  deviceLocale = 'i18n'

  rules = Object.assign(this.rules, rules)

  getErrorsMessageInField(field, fieldName) {
    return this.getErrorsInField(field).map(errorMessage => {
      return fieldName + errorMessage
    })
  }

  getConfirmErrorsMessage(fieldName1, fieldName2) {
    return messages.confirm.replace('{1}', fieldName1).replace('{2}', fieldName2)
  }
}