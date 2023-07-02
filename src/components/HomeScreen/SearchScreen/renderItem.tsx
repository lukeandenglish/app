import * as R from 'ramda';
import React from 'react';
import {View} from 'react-native';
import SECTION from '../../../config/section';
import {Stack_Component} from './Section/Stack_Component';

export const renderItem = (render: any) => {
  switch (R.path(['section', 'title'])(render)) {
    case SECTION.HOME.MY_STACK:
      return <Stack_Component {...render.item} />;
    default:
      return <View />;
  }
};
