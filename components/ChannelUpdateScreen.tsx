import React from 'react'
import {
  ScrollView,
} from 'react-native'
import i18n from '../i18n'
import LayoutComponent from './LayoutComponent'
import VideoPickerComponent from './VideoPickerComponent'
import { List, Picker, InputItem, WhiteSpace, Toast, Portal } from '@ant-design/react-native'
import SubmitButtonComponent from './SubmitButtonComponent'
import { channelCategoryFamilyAll } from '../api/ChannelCategory'
import { channelUpdate, channelView } from '../api/Channel'
import { fileUpToken, fileUpload, fileCreate } from '../api/File'
import FormComponent from './FormComponent'

export default class ChannelUpdateScreen extends FormComponent {

  static navigationOptions = {
    header: null
  }

  state = {
    loading: false,
    channel_category: [],
    data: {
      id: 0,
      name: '',
      channel_category_id: undefined,
      channel_category: {},
      videoSrc: null,
      file_id: 0,
    }
  }

  componentWillMount() {
    let { id } = this.props.navigation.state.params
    this.setState({ data: { ...this.state.data, id } })
    this.getInfo(id)
  }

  getInfo = (id) => {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        let loadingToastKey
        loadingToastKey = Toast.loading(i18n.t('info.loading'))
        channelView(id).then((response) => {
          this.setState({ data: { id: response.id, name: response.name, channel_category_id: response.channel_category_id, channel_category: response.channel_category, videoSrc: response.file.domain + response.file.key, file_id: response.file_id }, loading: false })
          Portal.remove(loadingToastKey)
        })
      })
    }
  }

  setVideoSrc = (videoSrc) => {
    this.setState({ data: { ...this.state.data, videoSrc, file_id: 0 } })
  }

  onChannelCategoryPress = async () => {
    let data = await channelCategoryFamilyAll()
    let channel_category = []
    for (let v of data) {
      channel_category.push({ value: v.id, label: v.name })
    }
    this.setState({ channel_category: channel_category })
  }

  onChannelCategoryChange = (value) => {
    this.setState({ data: { ...this.state.data, channel_category_id: value[0] } });
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
    if (this.state.data.file_id == 0) {
      return fileUpToken({ name: this.state.data.videoSrc }).then(response => {
        let formData = new FormData()
        formData.append('key', response.key)
        formData.append('token', response.upToken)
        formData.append('file', { uri: this.state.data.videoSrc, type: 'multipart/form-data' })
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
            return channelUpdate(this.state.data.id, this.state.data).then(channelUpdateResponse => {
              this.props.navigation.navigate('Channel')
            })
          })
        })
      }).catch(error => {
        Toast.fail(error)
      })
    } else {
      return channelUpdate(this.state.data.id, this.state.data).then(channelUpdateResponse => {
        console.log(channelUpdateResponse)
        this.props.navigation.navigate('Channel')
      })
    }
  }

  render() {
    return (
      <LayoutComponent navigation={this.props.navigation} selectedTab='user'>
        <ScrollView>
          <List renderHeader={i18n.t('channelCreate.base')}>
            <InputItem
              clear
              placeholder={i18n.t('input.placeholder')}
              ref={el => (this.inputRef = el)}
              onChange={(name) => this.setState({ data: { ...this.state.data, name } })}
              value={this.state.data.name}
            >
              {i18n.t('channelCreate.name')}
            </InputItem>
            <Picker
              data={this.state.channel_category}
              cols={1}
              value={[this.state.data.channel_category_id]}
              onChange={this.onChannelCategoryChange}
            >
              <List.Item
                arrow="horizontal"
                onPress={this.onChannelCategoryPress}
              // extra={this.state.data.channel_category.name}
              >
                {i18n.t('channelCreate.channelCategoryId')}
              </List.Item>
            </Picker>
          </List>
          <List renderHeader={i18n.t('channelCreate.file')}>
            <VideoPickerComponent onChange={this.setVideoSrc} videoSrc={this.state.data.videoSrc}></VideoPickerComponent>
          </List>
          <WhiteSpace />
          <SubmitButtonComponent onPress={() => { return this.onSubmit() }}>{i18n.t('button.submit')}</SubmitButtonComponent>
        </ScrollView>
      </LayoutComponent>
    );
  }
}
