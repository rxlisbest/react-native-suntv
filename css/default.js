import {
  StyleSheet,
} from 'react-native'
import ScreenUtils from '../utils/ScreenUtils'

const formWidth = ScreenUtils.width / 4 * 3 // 表单宽度

// LayoutComponentStyle
export const LayoutComponentStyle = StyleSheet.create({
  container: {
    height: ScreenUtils.fullHeight,
    backgroundColor: '#EDEDED',
  },
  statusBarStyle: {
    display: ScreenUtils.isFullScreen ? 'flex' : 'none',
    backgroundColor: 'rgb(240, 161, 168)',
    height: ScreenUtils.statusBarHeight,
    width: ScreenUtils.width,
  },
})

// CaptchaInputComponentStyle
export const CaptchaInputComponentStyle = StyleSheet.create({
  codeButton: {
    width: 110,
    height: 40,
  },
})

// ChannelScreenStyle
export const ChannelScreenStyle = StyleSheet.create({
  container: {
    height: ScreenUtils.fullHeight,
  },
  backgroundVideo: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: 300,
    height: 200,
  },
})

// ChannelViewScreenStyle
export const ChannelViewScreenStyle = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: '#000000',
    width: ScreenUtils.width,
    height: ScreenUtils.width / 16 * 9,
  },
})

// CountDownButtonComponentStyle
export const CountDownButtonComponentStyle = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: '#000000',
    width: ScreenUtils.width,
    height: ScreenUtils.width / 16 * 9,
  },
})

// IndexScreenStyle
export const IndexScreenStyle = StyleSheet.create({
  container: {
    height: ScreenUtils.fullHeight,
  },
  backgroundVideo: {
    flex: 1,
    width: 300,
    height: 200,
  },
  scrollViewStyle: {
    flex: 1,
  },
  tileContainerStyle: {
    backgroundColor: '#FFFFFF',
  },
  tileImageContainerStyle: {
    backgroundColor: '#000000',
    width: ScreenUtils.width,
    height: ScreenUtils.width / 16 * 9,
  },
  tileTextStyle: {
    color: '#999999',
    flexWrap: 'nowrap',
  },
})

// InitScreenStyle
export const InitScreenStyle = StyleSheet.create({
  container: {
  },
})

// LoginScreenStyle
export const LoginScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(240, 161, 168)',
    flex: 1,
  },
  containerBackground: {
    flex: 1,
    //宽高为 null 屏幕自适应
    width: null,
    height: null,
    paddingTop: ScreenUtils.height / 4,
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
    borderColor: '#158bb8',
    backgroundColor: '#158bb8',
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
    color: '#FFFFFF',
  },
  register: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 10,
    color: "#158bb8",
  },
  passwordLoginText: {
    paddingLeft: 10,
    fontSize: 16,
    alignSelf: "flex-start",
    marginRight: 10,
    color: "#158bb8",
  },
})

// PasswordLoginScreenStyle
export const PasswordLoginScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(240, 161, 168)',
    flex: 1,
  },
  containerBackground: {
    flex: 1,
    //宽高为 null 屏幕自适应
    width: null,
    height: null,
    paddingTop: ScreenUtils.height / 4,
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
    borderColor: '#158bb8',
    backgroundColor: '#158bb8',
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
    color: '#FFFFFF',
  },
  register: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 10,
    color: "#158bb8",
  },
  password: {
    marginBottom: 20,
  },
  loginText: {
    paddingLeft: 10,
    fontSize: 16,
    alignSelf: "flex-start",
    marginRight: 10,
    color: "#158bb8",
  },
})

// RegisterScreenStyle
export const RegisterScreenStyle = StyleSheet.create({
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
    borderColor: '#158bb8',
    backgroundColor: '#158bb8',
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
    color: '#FFFFFF',
  },
  login: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 10,
    color: "#158bb8",
  },
  password: {
    marginBottom: 20,
  },
  confirmPassword: {
    marginBottom: 20,
  },
})

// SubmitButtonComponentStyle
export const SubmitButtonComponentStyle = StyleSheet.create({
  buttonStyle: {
    borderColor: 'rgb(240, 161, 168)',
    backgroundColor: 'rgb(240, 161, 168)',
  }
})

// TabNavigatorComponentStyle
export const TabNavigatorComponentStyle = StyleSheet.create({
  selectedStyle: {
    color: 'rgb(240, 161, 168)',
  }
})

// UserScreenStyle
export const UserScreenStyle = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'rgb(240, 161, 168)',
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  list: {
    // marginTop: 10,
  },
  createFlex: {
    height: ScreenUtils.width / 3,
    backgroundColor: '#FFFFFF',
    color: '#999999',
  },
  createFlexText: {
    // color: '#999999',
  },
  createFlexItem: {
    marginBottom: ScreenUtils.width / 18,
  },
  changeFamilyButton: {
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderRadius: 10,
  },
  changeFamilyButtonText: {
    color: '#FFFFFF',
  },
  nameFlexItem: {
    marginBottom: 25,
  },
  nameFlexItemText: {
    fontSize: 15,
  },
})

// VideoPickerComponentStyle
export const VideoPickerComponentStyle = StyleSheet.create({
  backgroundVideo: {
    width: ScreenUtils.width,
    height: ScreenUtils.width / 4 * 3,
    backgroundColor: '#000000'
  },
  closeButton: {
    position: 'absolute',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 30,
    borderColor: '#999999',
    right: 0,
    top: 0,
    zIndex: 99,
  },
  pickVideo: {
    width: ScreenUtils.width,
    height: ScreenUtils.width / 4 * 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickVideoIcon: {
  },
})

// ChannelCategoryCreateScreenStyle
export const ChannelCategoryCreateScreenStyle = StyleSheet.create({
})

// ChannelCategoryScreenStyle
export const ChannelCategoryScreenStyle = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
})