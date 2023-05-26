import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';

export interface iButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  right?: boolean;
  style?: ViewStyle | TextStyle;
  styleText?: ViewStyle | TextStyle;
  title?: string;
  component?: React.ReactNode | null;
  notHorizontal?: boolean;
  notVertical?: boolean;
}
