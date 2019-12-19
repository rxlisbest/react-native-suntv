import React from 'react';
import {
  Text,
  View,
} from 'react-native'
import {
  Button,
  Input,
} from 'react-native-elements'
import i18n from '../i18n'
import Toast from 'react-native-root-toast'
import FormComponent from './FormComponent'

import { usersPasswordLogin } from '../api/Users'
import { AsyncStorage } from 'react-native'
import { Flex } from '@ant-design/react-native'
import { PasswordLoginScreenStyle as styles } from '../css/default'

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;

export default class PasswordLoginScreen extends FormComponent {
  state = {
    cellphone: '',
    password: '',
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
  }

  onSubmitForm() {
    // validate
    this.validate({
      cellphone: { required: true, cellphone: true },
      password: { required: true },
    })
    let fields = [
      { field: 'cellphone', fieldName: i18n.t('passwordLogin.cellphone') },
      { field: 'password', fieldName: i18n.t('passwordLogin.password') },
    ]
    for (let v of fields) {
      if (this.isFieldInError(v.field)) {
        Toast.show(this.getErrorsMessageInField(v.field, v.fieldName)[0], {
          position: Toast.positions.CENTER
        })
        return false;
      }
    }

    return usersPasswordLogin({ "cellphone": this.state.cellphone, "password": this.state.password }).then(data => {
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
        // source={require('../assets/passwordLoginBg.jpg')} style={styles.containerBackground}
        // resizeMode="stretch"
        >
          <View
            style={styles.form}
          >
            <View
              style={styles.cellphone}
            >
              <Input
                placeholder={i18n.t('passwordLogin.cellphone')}
                placeholderTextColor="#888"
                errorStyle={{ color: 'red' }}
                onChangeText={(cellphone) => this.setState({ cellphone })}
                value={this.state.cellphone}
              // leftIcon={{ type: 'font-awesome', name: 'mobile', size: 45 }}
              // leftIconContainerStyle={{ paddingLeft: 2, marginLeft: 0, marginRight: 15 }}
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
            <Button
              buttonStyle={styles.formButton}
              title={i18n.t('passwordLogin.submit')}
              titleStyle={styles.formButtonTitleStyle}
              loading={false} disabled={false}
              onPress={() => this.onSubmitForm()}
            />
            <View style={styles.register}>
              <Flex justify="start" align="start">
                <Flex.Item >
                  <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}
                  >
                    {i18n.t('passwordLogin.login')}
                  </Text>
                </Flex.Item>
                <Flex.Item>
                  <Text
                    style={styles.registerText}
                    onPress={() => this.props.navigation.navigate('Register')}
                  >
                    {i18n.t('passwordLogin.register')}
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
