import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  requireNativeComponent,
  ScrollView,
} from 'react-native';
import {
  connect
} from "react-redux";
import {
  Avatar,
  ThemeProvider,
  ListItem
} from 'react-native-elements'
import {
  Audio,
  Video
} from 'expo-av';
import {
  Header
} from 'react-native-elements';
import {
  ScreenOrientation
} from 'expo'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import ImagePickerComponent from './VideoPickerComponent'
import { List, InputItem, Toast, WhiteSpace } from '@ant-design/react-native'
import ScreenUtils from '../utils/ScreenUtils'
import { channelCategoryCreate } from '../api/ChannelCategory'
import SubmitButtonComponent from './SubmitButtonComponent'
import FormComponent from './FormComponent'

export default class ChannelCategoryCreateScreen extends FormComponent {

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
      name: { required: true, minlength: 6, maxlength: 20 },
    })
    let fields = [
      { field: 'name', fieldName: i18n.t('channelCategory.name') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.fail(this.getErrorsMessageInField(v.field, v.fieldName)[0])
        return false
      }
    }

    return channelCategoryCreate({ "name": this.state.name }).then(data => {
      console.log(data)
      Toast.success("123")
    }).catch(error => {
      Toast.fail(error)
    })
  }

  render() {
    return (
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <ScrollView>
          <List renderHeader={'基本'} style={{ marginTop: ScreenUtils.statusBarHeight }}>
            <InputItem
              clear
              placeholder="点击下方按钮该输入框会获取光标"
              ref={el => (this.inputRef = el)}
              onChange={(name) => this.setState({ name })}
              value={this.state.name}
            >
              标题
            </InputItem>
          </List>
          <WhiteSpace />
          <SubmitButtonComponent onPress={() => { return this.onPress() }}>{i18n.t('button.submit')}</SubmitButtonComponent>
        </ScrollView>
      </LayoutComponent>
    );
  }
}
// Later on in your styles..
var styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'rgb(240, 161, 168)',
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  list: {
    marginTop: 10,
  }
});