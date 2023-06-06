import {Dimensions, Platform} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export const Layout = {
  BOTTOM_SPACE: getBottomSpace(),
  IS_ANDROID: Platform.OS === 'android',
  STATUS_BAR_HEIGHT: getStatusBarHeight(true),
  TOP_SPACE: Platform.OS === 'android' ? 0 : getStatusBarHeight(true),
  isSmallDevice: width <= 375,
  window: {
    height,
    width,
  },
};
