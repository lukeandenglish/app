/* eslint-disable react-native/no-inline-styles */
import * as R from 'ramda';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Inset, Stack} from '../Spacing';
import {FontFamily, Typography} from '../Typografy';
import {Units, isCalcSize} from '../Units';
import colors from '../colors';

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

export const AnimateIInput = React.forwardRef(
  (props: iRestCustom & any, ref) => {
    const inputRef = React.useRef<refTextInput>(null);
    const [state, setState] = React.useState<boolean>(false);
    const refTimer = React.useRef<refTimerType>(null);
    const [secure, setSecure] = React.useState<boolean>(true);

    const focus = () => {
      if (!props.editable) {
        return;
      }
      refTimer?.current && clearTimeout(refTimer?.current);
      refTimer.current = setTimeout(() => {
        props?.onScrollRef && props?.onScrollRef();
        refTimer?.current && clearTimeout(refTimer.current);
      }, 750);
      inputRef?.current && inputRef.current?.focus();
      setState(true);
    };
    React.useImperativeHandle(ref, () => ({
      focus,
    }));

    const Container = props?.container ?? TextInput;

    let customStyle = styleInput('Loading');
    if (!props.editable) {
      customStyle = styleInput('Disabled');
    }
    if (props.editable) {
      customStyle = styleInput('Unfocus');
      if (state) {
        customStyle = styleInput('Hover');
      }
      if (state && props.error) {
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

    return (
      <Pressable
        accessibilityRole="button"
        onPress={focus}
        style={[props.style ? props.style : {}]}>
        {props?.placeholderName && (
          <Inset horizontal="s16" vertical="s1">
            <Text
              style={[
                Platform.OS === 'ios' ? Typography.text14 : Typography.text12,
                styles.placeholder,
                FontFamily['300'],
              ]}>
              {props?.placeholderName ?? ''}
            </Text>
          </Inset>
        )}
        <Stack size="s4" />
        <Pressable
          accessibilityRole="button"
          onPress={focus}
          style={[
            {
              borderWidth: 1,
              borderRadius: isCalcSize(100),
              backgroundColor: colors.whitesmoke_100,
              borderColor: colors.whitesmoke_100,
            },
            props?.styleContainer ?? {},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Container
              {...props}
              ref={inputRef}
              placeholderTextColor={placeholderTextColor}
              returnKeyType="done"
              onFocus={focus}
              onBlur={() => setState(false)}
              secureTextEntry={props?.secureTextEntry ? secure : false}
              style={StyleSheet.flatten([
                Platform.OS === 'ios' ? Typography.text14 : Typography.text14,
                {
                  color: colors.lightInk,
                  minWidth: isCalcSize(200),
                  width: '100%',
                  lineHeight: Platform.OS === 'ios' ? Units.s16 : Units.s14,
                  marginTop: 0,
                  marginBottom: 0,
                },
                FontFamily['500'],
                {
                  paddingVertical:
                    Platform.OS === 'ios' ? Units.s16 : Units.s14,
                },
                {
                  paddingHorizontal:
                    Platform.OS === 'ios' ? Units.s16 : Units.s14,
                },
                props?.styleInput ?? {},
              ])}
            />
            {props.secureTextEntry && (
              <TouchableOpacity
                onPress={() => setSecure(!secure)}
                style={{
                  width: isCalcSize(30),
                  height: isCalcSize(30),
                  position: 'absolute',
                  zIndex: 1000,
                  backgroundColor: 'red',
                  right: isCalcSize(10),
                  top: isCalcSize(15),
                  bottom: isCalcSize(15),
                }}
              />
            )}
          </View>
        </Pressable>
      </Pressable>
    );
  },
);

export const styles = StyleSheet.create({
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
