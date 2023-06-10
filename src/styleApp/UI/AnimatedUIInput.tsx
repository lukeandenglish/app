/* eslint-disable react-native/no-inline-styles */
import * as R from 'ramda';
import React from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  Layout as RNRLayout,
  ZoomInLeft,
  ZoomOutRight,
} from 'react-native-reanimated';
import {refTextInput, refTimerType} from '../../helper/type';
import {Inset, Stack} from '../Spacing';
import {FontFamily, Typography} from '../Typografy';
import {Units, isCalcSize} from '../Units';
import colors from '../colors';
import {isEmptyString} from '../../helper';

const InitialStyte = {
  placeholderName: {
    style: {
      color: '#636363',
      fontSize: Units.s12,
      lineHeight: Units.s16,
      fontWeight: '400',
      flex: 1,
      wordWrap: 'wrap',
    },
  },
  placeholder: {
    style: {
      color: '#AEAEAE',
      fontSize: Units.s12,
      lineHeight: Units.s16,
      fontWeight: '400',
    },
  },
  container: {
    style: {
      position: 'relative',
      height: isCalcSize(74),
      borderWidth: 1,
      paddingHorizontal: Units.s16,
      paddingVertical: Units.s4,
      minHeight: isCalcSize(74),
    },
  },
  textField: {
    style: {
      fontWeight: '400',
      fontSize: Units.s14,
      lineHeight: Units.s20,
      minWidth: '50%',
      color: colors.lightInk,
      background: '#F9F9F9',
      borderRadius: isCalcSize(100),
      margin: 0,
      padding: 0,
      borderWidth: 1,
      marginTop: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
    },
  },
  loading: {
    style: {
      width: isCalcSize(20),
      height: isCalcSize(20),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: Units.s16,
      top: Units.s16,
    },
  },
};

const styleInput = mode => {
  switch (mode) {
    case 'Loading':
      return InitialStyte;
    case 'Disabled':
      return R.pipe(
        R.assocPath(['container', 'style', 'backgroundColor'], colors.lightInk),
        R.assocPath(['textField', 'style', 'color'], colors.lightInk),
      )(InitialStyte);
    case 'ErrorEmpty':
      return R.pipe(
        R.assocPath(['container', 'style', 'borderColor'], colors.alert),
      )(InitialStyte);
    case 'ErrorFilled':
      return R.pipe(
        R.assocPath(['container', 'style', 'borderColor'], colors.alert),
      )(InitialStyte);
    case 'Hover':
      return R.pipe(
        R.assocPath(['container', 'style', 'borderColor'], '#EFEFEF'),
      )(InitialStyte);
    case 'Filled':
      return InitialStyte;
    case 'Unfocus':
      return R.pipe(
        R.assocPath(['container', 'style', 'borderColor'], '#EFEFEF'),
      )(InitialStyte);
    default:
      return InitialStyte;
  }
};

export type iAnimateInput = TextInputProps & {
  onScrollRef: () => void;
  errorMsg?: string;
  loading?: boolean;
  onEndEditing?: () => void;
  customPlaceholderColor?: TextStyle;
  placeholderNameStyle?: TextStyle;
  styleContainer?: ViewStyle;
  styleInput?: ViewStyle | TextStyle;
  style?: ViewStyle;
  container?: React.ReactNode;
  placeholderName?: string;
  modalChildren?: React.ReactNode;
  onNextFocus: () => void;
};

export const AnimateIInput = React.forwardRef((props: iAnimateInput, ref) => {
  const inputRef = React.useRef<refTextInput>(null);
  const [state, setState] = React.useState<boolean>(false);
  const refTimer = React.useRef<refTimerType>(null);

  const handleEndEditing = e => {
    inputRef?.current && inputRef.current?.blur();
    props?.onEndEditing && props?.onEndEditing(e?.nativeEvent.text);
    setState(false);
    props.onNextFocus && props.onNextFocus();
  };

  const handleFocus = () => {
    if (!props.editable) {
      return;
    }
    refTimer?.current && clearTimeout(refTimer?.current);
    refTimer.current = setTimeout(() => {
      inputRef?.current && inputRef.current?.focus();
      props?.onScrollRef && props?.onScrollRef();
    }, 300);
    setState(true);
  };

  const handleBlur = () => {
    inputRef?.current && inputRef.current?.blur();
    props?.onEndEditing && props.onEndEditing();
    setState(false);
    Keyboard.dismiss();
  };

  React.useImperativeHandle(ref, () => ({
    focus: handleFocus,
    blur: handleBlur,
  }));

  let customStyle = styleInput('Loading');
  if (!props.editable) {
    customStyle = styleInput('Disabled');
  }
  if (props.editable) {
    customStyle = styleInput('Unfocus');
    if (state) {
      customStyle = styleInput('Hover');
    }
    if (state && props.errorMsg) {
      customStyle = styleInput('ErrorFilled');
    }
    if (props.loading) {
      props = R.assocPath(['editable'], false)(props);
      customStyle = styleInput('Loading');
    }
  }

  let placeholderTextColor = customStyle.placeholderName;
  if (props.value === '') {
    placeholderTextColor = customStyle.textField.style.color;
  }

  if (state) {
    placeholderTextColor = colors.transparent;
  }
  if (!state && props.customPlaceholderColor) {
    placeholderTextColor = customStyle.textField.style.color;
  }

  const [Container] = [props?.container ?? TextInput] as React.ReactNode[];

  return (
    <>
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={handleFocus}
        style={[props.style ? props.style : {}, styles.containerStyle]}>
        {props?.placeholderName ? (
          <Inset horizontal="s16" vertical="s1">
            <Animated.View
              entering={ZoomInLeft}
              exiting={ZoomOutRight}
              layout={RNRLayout.duration(1400).delay(1400)}>
              <Text
                style={[
                  Platform.OS === 'ios' ? Typography.text14 : Typography.text12,
                  styles.placeholder,
                  FontFamily['300'],
                  props?.placeholderNameStyle ?? {},
                ]}>
                {props?.placeholderName ?? ''}
              </Text>
            </Animated.View>
          </Inset>
        ) : (
          <View />
        )}
        <Stack size="s4" />
        <View style={[styles.pressableStyle, props?.styleContainer ?? {}]}>
          <View style={styles.customRows}>
            <Container
              returnKeyType="next"
              underlineColorAndroid="transparent"
              ref={inputRef}
              {...props}
              placeholderTextColor={placeholderTextColor}
              onFocus={handleFocus}
              // onBlur={handleBlur}
              onEndEditing={handleEndEditing}
              style={StyleSheet.flatten([
                Platform.OS === 'ios' ? Typography.text14 : Typography.text14,
                FontFamily['500'],
                styles.styleInput,
                props?.styleInput ?? {},
              ])}
            />
          </View>
          {props.modalChildren ? props.modalChildren : <View />}
        </View>
        {!isEmptyString(props.errorMsg) && (
          <Inset horizontal="s16" top="s4" bottom="s10">
            <Text style={[styles.styleTextError, Typography.text12]}>
              {props.errorMsg}
            </Text>
          </Inset>
        )}
      </TouchableWithoutFeedback>
    </>
  );
});

export const styles = StyleSheet.create({
  containerStyle: {flex: 1, position: 'relative'},
  customRows: {flexDirection: 'row', justifyContent: 'space-between'},
  styleTextError: {color: colors.alert},
  styleInput: {
    color: colors.lightInk,
    minWidth: isCalcSize(200),
    letterSpacing: 1.01,
    width: '100%',
    lineHeight: Platform.OS === 'ios' ? Units.s16 : Units.s14,
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: Platform.OS === 'ios' ? Units.s16 : Units.s14,
    paddingHorizontal: Platform.OS === 'ios' ? Units.s16 : Units.s14,
  },
  textSecureStyle: {
    width: isCalcSize(30),
    height: isCalcSize(30),
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'red',
    right: isCalcSize(10),
    top: isCalcSize(15),
    bottom: isCalcSize(15),
  },
  pressableStyle: {
    borderWidth: 1,
    borderRadius: isCalcSize(100),
    backgroundColor: colors.whitesmoke_100,
    borderColor: colors.whitesmoke_100,
  },
  placeholder: {
    color: colors.dimgray,
    fontWeight: '400',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: colors.gray_100,
    borderRadius: Units.s6,
    justifyContent: 'center',
    minHeight: isCalcSize(40),
    maxHeight: isCalcSize(48),
  },

  insetsScroll: {
    backgroundColor: colors.lightPrimary,
    borderColor: colors.gray_500,
    borderTopLeftRadius: Units.s16,
    borderTopRightRadius: Units.s16,
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewCC: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
});
