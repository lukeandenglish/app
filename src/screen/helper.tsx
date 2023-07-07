import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';

export const ModalSlideFunc = (
  header: boolean,
): NativeStackNavigationOptions => ({
  animationEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: {shadowColor: 'transparent'},
  gestureEnabled: true,
  headerShown: header || false,
  presentation: 'modal',
  ...TransitionPresets.ModalPresentationIOS,
});

export const SlideRightFunc = (
  header: boolean,
): NativeStackNavigationOptions => ({
  animationEnabled: false,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  headerShown: header || false,
  ...TransitionPresets.SlideFromRightIOS,
});

export const SlideToTop = (header: boolean): NativeStackNavigationOptions => ({
  animationEnabled: false,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  headerShown: header || false,
  ...TransitionPresets.BottomSheetAndroid,
});

export const ScaleSlideRightFunc = (
  header: boolean,
  gestureEnabled = true,
): NativeStackNavigationOptions => ({
  animationEnabled: false,
  cardOverlayEnabled: true,
  gestureEnabled,
  headerShown: header || false,
  ...TransitionPresets.ScaleFromCenterAndroid,
});
