import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {iButtonProps} from '.';
import {Units} from '../Units';
import {Inset, Queue} from '../Spacing';
import {Typography} from '../Typografy';
import colors from '../colors';

export function Button({
  title = '',
  onPress = () => null,
  disabled = false,
  style = {},
  styleText = {},
  component = null,
  notHorizontal = false,
  notVertical = false,
  children = null,
  right = false,
}: iButtonProps) {
  const Component = component ? component : TouchableOpacity;

  return (
    <Component
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={Object.assign([
        styles.buttonContainer,
        style,
        disabled && {backgroundColor: colors.lightSecondary},
      ])}>
      <Inset
        horizontal={notHorizontal ? 's2' : 's14'}
        vertical={notVertical ? 's2' : 's10'}
        layout={StyleSheet.flatten({
          alignItems: 'center',
          flexDirection: 'row',
        })}>
        {!right && children}
        {children && <Queue size="s12" />}
        <Text
          style={Object.assign([
            Typography.text14,
            styles.button,
            disabled && {
              color: colors.gray_200,
            },
            styleText,
          ])}>
          {title}
        </Text>
        {children && <Queue size="s12" />}
        {right && children}
      </Inset>
    </Component>
  );
}

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: colors.actionColor,
    borderRadius: Units.s12,
    justifyContent: 'center',
    height: Units.s48,
  },
  button: {
    color: colors.white,
    fontWeight: '600',
    letterSpacing: 0,
    padding: 0,
  },
});
