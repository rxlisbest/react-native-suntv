import React from 'react'
import {
  ScrollView,
} from 'react-native'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import { List, InputItem, Toast, WhiteSpace, Portal, Button, Modal } from '@ant-design/react-native'
import { familyView, familyUpdate, familyDelete } from '../api/Family'
import SubmitButtonComponent from './SubmitButtonComponent'
import FormComponent from './FormComponent'

export default class FamilyUpdateScreen extends FormComponent {

  static navigationOptions = {
    header: null
  }

  state = {
    loading: false,
    data: {
      id: 0,
      name: '',
    },
  }

  componentDidMount() {
    let { id } = this.props.navigation.state.params
    this.setState({ ...this.state.data, id })
    this.getInfo(id)
  }

  getInfo = (id) => {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        let loadingToastKey
        loadingToastKey = Toast.loading(i18n.t('info.loading'))
        familyView(id).then((response) => {
          this.setState({ data: response, loading: false })
          Portal.remove(loadingToastKey)
        })
      })
    }
  }

  onDelete = (id) => {
    let _this = this
    Modal.alert(i18n.t('title.alert'), i18n.t('alert.delete'), [
      {
        text: i18n.t('button.cancel'),
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: i18n.t('button.confirm'), onPress: () => {
          familyDelete(id).then(response => {
            this.props.navigation.push('Family')
          }).catch(error => {
            Toast.fail(error)
          })
        }
      },
    ])
  }

  onPress = () => {
    this.validate({
      name: { required: true, notnull: true },
    })
    let fields = [
      { field: 'data.name', fieldName: i18n.t('familyCreate.name') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.fail(this.getErrorsMessageInField(v.field, v.fieldName)[0])
        return false
      }
    }

    return familyUpdate(this.state.data.id, this.state.data).then(data => {
      Toast.success(i18n.t('success.update'), 0.5, () => {
        this.props.navigation.push('Family')
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
              onChange={(name) => this.setState({ data: { ...this.state.data, name } })}
              value={this.state.data.name}
            >
              {i18n.t('familyCreate.name')}
            </InputItem>
          </List>
          <WhiteSpace />
          <SubmitButtonComponent onPress={() => { return this.onPress() }}>{i18n.t('button.submit')}</SubmitButtonComponent>
          <WhiteSpace />
          <Button
            type="warning"
            onPress={() => { this.onDelete(this.state.data.id) }}
          >
            {i18n.t('button.delete')}
          </Button>
        </ScrollView>
      </LayoutComponent>
    );
  }
}
