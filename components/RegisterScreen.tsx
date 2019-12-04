import React from 'react';
import {
  StyleSheet,
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

import ScreenUtils from '../utils/ScreenUtils'

const formWidth = ScreenUtils.width / 4 * 3 // 表单宽度
import { create } from '../api/sms'
import { usersRegister } from '../api/users'
import { AsyncStorage } from 'react-native'
import CountDownButtonComponent from './CountDownButtonComponent'

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;

export default class RegisterScreen extends FormComponent {
  state = {
    client_id: '',
    name: '',
    password: '',
    confirmPassword: '',
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
      { field: 'cellphone', fieldName: i18n.t('register.cellphone') },
      { field: 'captcha', fieldName: i18n.t('register.captcha') },
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
      name: { required: true },
      cellphone: { required: true, cellphone: true },
      code: { required: true, numbers: true },
      password: { required: true, minlength: 6, maxlength: 20 },
      confirmPassword: { required: true, minlength: 6, maxlength: 20 },
    })
    let fields = [
      { field: 'name', fieldName: i18n.t('register.name') },
      { field: 'cellphone', fieldName: i18n.t('register.cellphone') },
      { field: 'code', fieldName: i18n.t('register.code') },
      { field: 'password', fieldName: i18n.t('register.password') },
      { field: 'confirmPassword', fieldName: i18n.t('register.confirmPassword') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.show(this.getErrorsMessageInField(v.field, v.fieldName)[0], {
          position: Toast.positions.CENTER
        })
        return false
      }
    }
    if (this.state.password != this.state.confirmPassword) {
      Toast.show(this.getConfirmErrorsMessage(i18n.t('register.password'), i18n.t('register.confirmPassword')), {
        position: Toast.positions.CENTER
      })
      return false
    }

    return usersRegister({ "cellphone": this.state.cellphone, "code": this.state.code, "name": this.state.name, "password": this.state.password }).then(data => {
      this.storeToken(data.token).then(res => {
        if (res === true) {
          this.props.navigation.navigate('Login')
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
        // source={require('../assets/registerBg.jpg')} style={styles.containerBackground}
        // resizeMode="stretch"
        >
          <View
            style={styles.form}
          >
            <View
              style={styles.name}
            >
              <Input
                placeholder={i18n.t('register.name')}
                placeholderTextColor="#888"
                errorStyle={{ color: 'red' }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              // leftIcon={{ type: 'font-awesome', name: 'mobile', size: 45 }}
              // leftIconContainerStyle={{ paddingLeft: 2, marginLeft: 0, marginRight: 15 }}
              />
            </View>

            <View
              style={styles.cellphone}
            >
              <Input
                placeholder={i18n.t('register.cellphone')}
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
                  placeholder={i18n.t('register.captcha')}
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
                  placeholder={i18n.t('register.code')}
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
                title={i18n.t('register.send')}
                onPress={() => { return this.onSendSms(this) }}
              />
            </View>
            <View
              style={styles.password}
            >
              <Input
                placeholder={i18n.t('register.password')}
                placeholderTextColor="#888"
                errorStyle={{ color: 'red' }}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}
                value={this.state.password}
              // leftIcon={{ type: 'font-awesome', name: 'mobile', size: 45 }}
              // leftIconContainerStyle={{ paddingLeft: 2, marginLeft: 0, marginRight: 15 }}
              />
            </View>

            <View
              style={styles.confirmPassword}
            >
              <Input
                placeholder={i18n.t('register.confirmPassword')}
                placeholderTextColor="#888"
                errorStyle={{ color: 'red' }}
                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                secureTextEntry={true}
                value={this.state.confirmPassword}
              // leftIcon={{ type: 'font-awesome', name: 'mobile', size: 45 }}
              // leftIconContainerStyle={{ paddingLeft: 2, marginLeft: 0, marginRight: 15 }}
              />
            </View>

            <Button
              buttonStyle={styles.formButton}
              title={i18n.t('register.submit')}
              titleStyle={styles.formButtonTitleStyle}
              loading={false} disabled={false}
              onPress={() => this.onSubmitForm()}
            />
            <View style={styles.login}>
              <Text
                style={styles.loginText}
                onPress={() => this.props.navigation.navigate('PasswordLogin')}
              >
                {i18n.t('register.login')}
              </Text>
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
// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(240, 161, 168)',
    flex: 1,
  },
  containerBackground: {
    flex: 1,
    //宽高为 null 屏幕自适应
    width: null,
    height: null,
    paddingTop: ScreenUtils.height / 5,
  },
  name: {
    marginBottom: 20,
  },
  cellphone: {
    marginBottom: 20,
  },
  captcha: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  captchaInput: {
    width: formWidth - 121
  },
  captchaImage: {
    width: 110,
    height: 40,
  },
  form: {
    width: formWidth,
    alignSelf: 'center',
  },
  code: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  codeInput: {
    width: formWidth - 121,
  },
  codeButton: {
    width: 110,
    height: 40,
  },
  formButton: {
    alignSelf: 'center',
    width: formWidth - 20,
    marginTop: 5,
  },
  formButtonTitleStyle: {
    fontSize: 25,
  },
  copyright: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10
  },
  copyrightText: {
    alignSelf: "center",
    fontSize: 18,
    // color: '#FFFFFF',
  },
  login: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 10,
    color: "#2089dc",
  },
  password: {
    marginBottom: 20,
  },
  confirmPassword: {
    marginBottom: 20,
  },
});