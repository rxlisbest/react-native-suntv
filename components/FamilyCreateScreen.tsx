import React from 'react'
import {
  ScrollView,
} from 'react-native'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import { List, InputItem, Toast, WhiteSpace } from '@ant-design/react-native'
import { familyCreate } from '../api/Family'
import SubmitButtonComponent from './SubmitButtonComponent'
import FormComponent from './FormComponent'

export default class FamilyCreateScreen extends FormComponent {

  static navigationOptions = {
    header: null
  }

  state = {
    name: '',
  }

  componentDitMount() {
  }

  onPress = () => {
    this.validate({
      name: { required: true, notnull: true },
    })
    let fields = [
      { field: 'name', fieldName: i18n.t('familyCreate.name') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.fail(this.getErrorsMessageInField(v.field, v.fieldName)[0])
        return false
      }
    }

    return familyCreate({ "name": this.state.name }).then(data => {
      Toast.success(i18n.t('familyCreate.name'), 0.5, () => {
        this.props.navigation.navigate('Family')
      })
    }).catch(error => {
      Toast.fail(error)
    })
  }

  render() {
    return (
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <ScrollView>
          <List renderHeader={i18n.t('familyCreate.base')}>
            <InputItem
              clear
              placeholder={i18n.t('input.placeholder')}
              ref={el => (this.inputRef = el)}
              onChange={(name) => this.setState({ name })}
              value={this.state.name}
            >
              {i18n.t('familyCreate.name')}
            </InputItem>
          </List>
          <WhiteSpace />
          <SubmitButtonComponent onPress={() => { return this.onPress() }}>{i18n.t('button.submit')}</SubmitButtonComponent>
        </ScrollView>
      </LayoutComponent>
    );
  }
}
