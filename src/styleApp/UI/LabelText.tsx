/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
import {TextStyle, View, Text} from 'react-native';
import {Units} from '../Units';
import colors from '../colors';
import React from 'react';

export const LabelText = ({
  title = '',
  style = {},
  mode = 'title',
}: {
  title?: string;
  style?: TextStyle;
  mode?: string;
}) => {
  const styleCustom = () => {
    switch (mode) {
      case 'title':
        return Object.assign([
          {
            fontWeight: '500',
            color: colors.bodySecondary,
            lineHeight: Units.s24,
            fontSize: Units.s20,
          },
          style,
        ]);
      case 'desc':
        return Object.assign([
          {
            fontWeight: '400',
            color: colors.black,
            lineHeight: Units.s22,
            fontSize: Units.s16,
          },
          style,
        ]);
      case 'notify':
        return Object.assign([
          {
            fontWeight: '400',
            color: colors.bodySecondary,
            lineHeight: Units.s16,
            fontSize: Units.s12,
          },
          style,
        ]);
    }
  };

  return (
    <View style={{flexDirection: 'row', flexShrink: 1}}>
      <Text
        style={[
          {
            flex: 1,
            flexWrap: 'wrap',
          },
          styleCustom(),
        ]}>
        {title}
      </Text>
    </View>
  );
};
