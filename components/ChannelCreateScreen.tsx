import React from 'react'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import {
  ScreenOrientation
} from 'expo'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import VideoPickerComponent from './VideoPickerComponent'
import { List, Picker, InputItem, WhiteSpace, Toast } from '@ant-design/react-native'
import ScreenUtils from '../utils/ScreenUtils'
import SubmitButtonComponent from './SubmitButtonComponent'
import { channelCategoryAll } from '../api/ChannelCategory'
import { channelCreate } from '../api/Channel'
import { fileUpToken, fileUpload, fileCreate } from '../api/File'
import FormComponent from './FormComponent'

export default class ChannelCreateScreen extends FormComponent {

  static navigationOptions = {
    header: null
  }

  state = {
    name: '',
    channel_category: [],
    channel_category_id: undefined,
    videoSrc: '',
  }

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
  }

  setVideoSrc = (videoSrc) => {
    this.setState({ videoSrc })
  }

  onChannelCategoryPress = async () => {
    let data = await channelCategoryAll()
    let channel_category = []
    for (let v of data) {
      channel_category.push({ value: v.id, label: v.name })
    }
    this.setState({ channel_category: channel_category })
  }

  onChannelCategoryChange = (value) => {
    this.setState({ channel_category_id: value });
  }

  onSubmit = () => {
    this.validate({
      name: { required: true, notnull: true },
      channel_category_id: { required: true, notnull: true },
      videoSrc: { required: true, notnull: true },
    })
    let fields = [
      { field: 'name', fieldName: i18n.t('channelCategory.name') },
      { field: 'channel_category_id', fieldName: i18n.t('channelCreate.channelCategoryId') },
      { field: 'videoSrc', fieldName: i18n.t('channelCreate.file') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.fail(this.getErrorsMessageInField(v.field, v.fieldName)[0])
        return false
      }
    }
    console.log(2)
    console.log(this.state.videoSrc)
    return fileUpToken({ name: this.state.videoSrc }).then(response => {
      let formData = new FormData()
      formData.append('key', response.key)
      formData.append('token', response.upToken)
      formData.append('file', { uri: this.state.videoSrc, type: 'multipart/form-data' })
      return fileUpload(formData).then(fileUploadResponse => {
        let file = {
          key: fileUploadResponse.key,
          transcoding_code: fileUploadResponse.persistentId,
        }
        return fileCreate(file).then(fileCreateResponse => {
          let channel = { 
            file_id: fileCreateResponse.id, 
            name: this.state.name, 
            channel_category_id: this.state.channel_category_id[0] 
          }
          return channelCreate(channel).then(channelCreateResponse => {
            console.log(fileCreateResponse)
          })
        })
      })
    }).catch(error => {
      console.log(error)
      Toast.fail(error)
    })
    console.log(2)

    return channelCreate({ "name": this.state.name, channel_category_id: this.state.channel_category_id[0] }).then(data => {
      Toast.success("123")
      console.log(4)
    }).catch(error => {
      console.log(3)
      Toast.fail(error)
    })
  }

  render() {
    return (
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <ScrollView>
          <List renderHeader={i18n.t('channelCreate.base')} style={{ marginTop: ScreenUtils.statusBarHeight }}>
            <InputItem
              clear
              placeholder={i18n.t('input.placeholder')}
              ref={el => (this.inputRef = el)}
              onChange={(name) => this.setState({ name })}
              value={this.state.name}
            >
              {i18n.t('channelCreate.name')}
            </InputItem>
            <Picker
              data={this.state.channel_category}
              cols={1}
              value={this.state.channel_category_id}
              onChange={this.onChannelCategoryChange}
            >
              <List.Item
                arrow="horizontal"
                onPress={this.onChannelCategoryPress}
              >
                {i18n.t('channelCreate.channelCategoryId')}
              </List.Item>
            </Picker>
          </List>
          <List renderHeader={i18n.t('channelCreate.file')}>
            <VideoPickerComponent onChange={this.setVideoSrc}></VideoPickerComponent>
          </List>
          <WhiteSpace />
          <SubmitButtonComponent onPress={() => { return this.onSubmit() }}>{i18n.t('button.submit')}</SubmitButtonComponent>
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