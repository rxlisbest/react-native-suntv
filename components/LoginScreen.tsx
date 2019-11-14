import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  requireNativeComponent,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  processColor
} from 'react-native';
import {
  connect
} from "react-redux";
import {
  Button,
  ThemeProvider,
  Header,
  Image,
  Input,
  Icon
} from 'react-native-elements'
import {
  Audio,
  Video
} from 'expo-av';
import {
  ScreenOrientation
} from 'expo'
import i18n from '../i18n'
const { width, height } = Dimensions.get('window') // 页面宽度和高度
const formWidth = width / 4 * 3 // 表单宽度
import { create } from '../api/sms'
let data = create({ "cellphone": "18363857076", "captcha": 1 }).then(data => {
  console.log(data)
})
// ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
const _handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.presentFullscreenPlayer()
}
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;

export default class ViewScreen extends React.Component {
  state = {
    cellphone: '',
    captcha: '',
    code: '',
    captchaImageUrl: process.env.API_DOMAIN + "captcha.jpg"
  }

  static navigationOptions = {
    header: null
  };

  componentDitMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT)
  }

  reloadCaptchaImage() {
    let captchaImageUrl = process.env.API_DOMAIN + "captcha.jpg" + "?r=" + Math.random()
    this.setState({ "captchaImageUrl": captchaImageUrl })
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
                  placeholder={i18n.t('login.sms')}
                  placeholderTextColor="#888"
                  errorStyle={{ color: 'red' }}
                  onChangeText={(code) => this.setState({ code })}
                  value={this.state.code}
                // leftIcon={{ type: 'font-awesome', name: 'envelope-o', size: 27 }}
                // leftIconContainerStyle={{ paddingLeft: 0, marginLeft: 0, marginRight: 10 }}
                />
              </View>
              <Button type="outline" buttonStyle={styles.codeButton} title={i18n.t('login.send')} onPress={() => this.props.navigation.navigate('Index')} />
            </View>
            <Button
              buttonStyle={styles.formButton}
              title={i18n.t('login.submit')}
              titleStyle={styles.formButtonTitleStyle}
              loading={false} disabled={false}
              onPress={() => this.props.navigation.navigate('Index')}
            />
            <View style={styles.register}>
              <Text style={styles.registerText}>
                {i18n.t('login.register')}
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
    paddingTop: height / 4,
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
  register: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 10,
    color: "#2089dc",
  }
});