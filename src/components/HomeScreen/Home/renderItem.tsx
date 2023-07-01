import * as R from 'ramda';
import React from 'react';
import {View} from 'react-native';
import SECTION from '../../../config/section';
import {Stack} from '../../../styleApp/Spacing';
import {Styles} from '../../../styleApp/Styles';
import {Stack_Component} from './Section/Stack_Component';
import {Stack_Video_Component} from './Section/Stack_Video_Component';
import {WLC_Component} from './Section/WLC_Component';

export const renderItem = (render: any) => {
  switch (R.path(['section', 'title'])(render)) {
    case SECTION.HOME.WLC_STACK:
      return <WLC_Component />;
    case SECTION.HOME.MY_STACK:
      return <Stack_Component {...render.item} />;
    case SECTION.HOME.APPEND_STACK:
      return (
        <View style={Styles.flex1}>
          <Stack size="s10" />
          <Stack_Component {...render.item} />
        </View>
      );
    case SECTION.HOME.VIDEO_STACK:
      return (
        <View style={Styles.flex1}>
          <Stack size="s10" />
          <Stack_Video_Component {...render.item} />
        </View>
      );
    default:
      return <View />;
  }
};
