import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Button,
  Image,
  Input,
} from 'react-native-elements'
import i18n from '../i18n'
import Toast from 'react-native-root-toast'
import FormComponent from './FormComponent'
import { create } from '../api/Sms'
import { usersLogin } from '../api/Users'
import { AsyncStorage } from 'react-native'
import CountDownButtonComponent from './CountDownButtonComponent'
import { Flex } from '@ant-design/react-native'
import { LoginScreenStyle as styles } from '../css/default'

// ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;

export default class LoginScreen extends FormComponent {
  
  state = {
    client_id: '',
    cellphone: '',
    captcha: '',
    code: '',
    captchaImageUrl: ''
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
    this.reloadCaptchaImage()
  }

  async reloadCaptchaImage() {
    let clientId = await this.getClientId()
    this.setState({ "client_id": clientId })
    let captchaImageUrl = process.env.API_DOMAIN + "captcha.jpg" + "?r=" + Math.random() + '&client_id=' + clientId
    this.setState({ "captchaImageUrl": captchaImageUrl })
  }

  onSendSms(obj) {
    // validate
    obj.validate({
      cellphone: { required: true, cellphone: true },
      captcha: { required: true },
    })
    let fields = [
      { field: 'cellphone', fieldName: i18n.t('login.cellphone') },
      { field: 'captcha', fieldName: i18n.t('login.captcha') },
    ]
    for (let v of fields) {
      if (obj.isFieldInError(v.field)) {
        Toast.show(obj.getErrorsMessageInField(v.field, v.fieldName)[0], {
          position: Toast.positions.CENTER
        })
        return false;
      }
    }
    return create({ "cellphone": obj.state.cellphone, "captcha": obj.state.captcha, "client_id": obj.state.client_id }).then(data => {
      console.log(data)
    }).catch(error => {
      Toast.show(error.message, {
        position: Toast.positions.CENTER
      })
    })
  }

  onSubmitForm() {
    // validate
    this.validate({
      cellphone: { required: true, cellphone: true },
      code: { required: true, numbers: true },
    })
    let fields = [
      { field: 'cellphone', fieldName: i18n.t('login.cellphone') },
      { field: 'code', fieldName: i18n.t('login.code') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.show(this.getErrorsMessageInField(v.field, v.fieldName)[0], {
          position: Toast.positions.CENTER
        })
        return false;
      }
    }

    return usersLogin({ "cellphone": this.state.cellphone, "code": this.state.code }).then(data => {
      this.storeToken(data.token).then(res => {
        if (res === true) {
          this.props.navigation.navigate('Index')
        }
      })
    }).catch(error => {
      Toast.show(error.message, {
        position: Toast.positions.CENTER
      })
    })
  }

  async getClientId() {
    try {
      let value = await AsyncStorage.getItem('client_id');
      if (value === null) {
        // We have data!!
        value = await this.setClientId()
      }
      return value
    } catch (error) {
      Toast.show(error, {
        position: Toast.positions.CENTER
      })
    }
  }

  async setClientId() {
    try {
      let clientId = Math.random().toString(36).substr(3)
      await AsyncStorage.setItem('client_id', clientId)
      return clientId
    } catch (error) {
      Toast.show(error, {
        position: Toast.positions.CENTER
      })
    }
  }

  async storeToken(token) {
    try {
      await AsyncStorage.setItem('token', token)
      return true
    } catch (error) {
      Toast.show(error, {
        position: Toast.positions.CENTER
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.containerBackground}
        // source={require('../assets/loginBg.jpg')} style={styles.containerBackground}
        // resizeMode="stretch"
        >
          <View
            style={styles.form}
          >
            <View
              style={styles.cellphone}
            >
              <Input
                placeholder={i18n.t('login.cellphone')}
                placeholderTextColor="#888"
                errorStyle={{ color: 'red' }}
                onChangeText={(cellphone) => this.setState({ cellphone })}
                value={this.state.cellphone}
              // leftIcon={{ type: 'font-awesome', name: 'mobile', size: 45 }}
              // leftIconContainerStyle={{ paddingLeft: 2, marginLeft: 0, marginRight: 15 }}
              />
            </View>
            <View
              style={styles.captcha}
            >
              <View
                style={styles.captchaInput}
              >
                <Input
                  placeholder={i18n.t('login.captcha')}
                  placeholderTextColor="#888"
                  errorStyle={{ color: 'red' }}
                  onChangeText={(captcha) => this.setState({ captcha })}
                  value={this.state.captcha}
                // leftIcon={{ type: 'font-awesome', name: 'image', size: 25 }}
                // leftIconContainerStyle={{ paddingLeft: 0, marginLeft: 0, marginRight: 10 }}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.reloadCaptchaImage()}
                style={styles.captchaImage}
              >
                <Image
                  resizeMode="stretch"
                  source={{ uri: this.state.captchaImageUrl }}
                  style={styles.captchaImage}
                />
              </TouchableOpacity>
            </View>
            <View
              style={styles.code}
            >
              <View
                style={styles.codeInput}
              >
                <Input
                  placeholder={i18n.t('login.code')}
                  placeholderTextColor="#888"
                  errorStyle={{ color: 'red' }}
                  onChangeText={(code) => this.setState({ code })}
                  value={this.state.code}
                // leftIcon={{ type: 'font-awesome', name: 'envelope-o', size: 27 }}
                // leftIconContainerStyle={{ paddingLeft: 0, marginLeft: 0, marginRight: 10 }}
                />
              </View>
              <CountDownButtonComponent
                type="outline"
                buttonStyle={styles.codeButton}
                title={i18n.t('login.send')}
                onPress={() => { return this.onSendSms(this) }}
              />
            </View>
            <Button
              buttonStyle={styles.formButton}
              title={i18n.t('login.submit')}
              titleStyle={styles.formButtonTitleStyle}
              loading={false} disabled={false}
              onPress={() => this.onSubmitForm()}
            />
            <View style={styles.register}>
              <Flex justify="start" align="start">
                <Flex.Item >
                  <Text
                    style={styles.passwordLoginText}
                    onPress={() => this.props.navigation.navigate('PasswordLogin')}
                  >
                    {i18n.t('login.passwordLogin')}
                  </Text>
                </Flex.Item>
                <Flex.Item>
                  <Text
                    style={styles.registerText}
                    onPress={() => this.props.navigation.navigate('Register')}
                  >
                    {i18n.t('login.register')}
                  </Text>
                </Flex.Item>
              </Flex>
            </View>
          </View>
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              SunTV © ruixinglong.net
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
