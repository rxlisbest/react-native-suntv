import { NativeModules, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window') // 页面宽度和高度
let fullHeight = height
let isFullScreen = false
if (height / width > 1.8) {
    fullHeight += NativeModules.StatusBarManager.HEIGHT
    isFullScreen = true
}

export default screen = {
    width: width,
    height: height,
    fullHeight: fullHeight,
    statusBarHeight: NativeModules.StatusBarManager.HEIGHT,
    isFullScreen: isFullScreen,
}