/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  ViewStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import {Inset, Stack} from '../Spacing';
import {FontFamily, Typography} from '../Typografy';
import {Units} from '../Units';
import colors from '../colors';
import {RV} from '../Utils';

export const AnimateIInput = React.forwardRef(
  (props: iRestCustom & any, ref) => {
    const inputRef = React.useRef<TextInput | null>(null);
    const [state, setState] = React.useState<boolean>(false);
    const [secure, setSecure] = React.useState<boolean>(true);
    const refTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const focus = () => {
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

    const Container = TextInput;

    return (
      <Pressable
        accessibilityRole="button"
        onPress={focus}
        style={[props.style ? props.style : {}]}>
        {props?.placeholderName && (
          <Inset horizontal="s16" vertical="s1">
            <Text
              style={[
                Typography.text14,
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
              borderRadius: RV(100),
              backgroundColor: colors.whitesmoke_100,
              borderColor: colors.whitesmoke_100,
            },
            props?.styleContainer ?? {},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Container
              {...props}
              ref={inputRef}
              placeholderTextColor={colors.gray_300}
              returnKeyType="done"
              onFocus={focus}
              onBlur={() => setState(false)}
              secureTextEntry={props?.secureTextEntry ? secure : false}
              style={StyleSheet.flatten([
                Typography.text16,
                {
                  color: colors.lightInk,
                  minWidth: RV(200),
                  width: '100%',
                  lineHeight: Units.s14,
                  marginTop: 0,
                  marginBottom: 0,
                },
                FontFamily['500'],
                {paddingVertical: Units.s20},
                {paddingHorizontal: Units.s20},
                props?.styleInput ?? {},
              ])}
            />
            {props.secureTextEntry && (
              <TouchableOpacity
                onPress={() => setSecure(!secure)}
                style={{
                  width: RV(30),
                  height: RV(30),
                  position: 'absolute',
                  zIndex: 1000,
                  backgroundColor: 'red',
                  right: RV(10),
                  top: RV(15),
                  bottom: RV(15),
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
    minHeight: RV(40),
    maxHeight: RV(48),
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

interface iRestCustom {
  placeholderName: string | null;
  style: TextStyle | ViewStyle;
  styleContainer: ViewStyle;
  styleInput: TextStyle;
}
