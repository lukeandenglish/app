import * as R from 'ramda';
import React from 'react';
import {View} from 'react-native';
import SECTION from '../../../config/section';
import {MyImage} from './Section/MyImage';
import {Result} from './Section/Result';
import {SelectionCode} from './Section/SelectionCode';

export interface iStackData {
  stackId: string;
  id: string;
  title: string;
  translate: string;
}

export const renderItem = (render: any) => {
  switch (R.path(['section', 'title'])(render)) {
    case SECTION.CARD.MY_IMAGE:
      return <MyImage {...render.item} />;
    case SECTION.CARD.MY_RESULT:
      return <Result {...render.item} />;
    case SECTION.CARD.MY_COLLECTION:
      return <SelectionCode {...render.item} />;
    default:
      return <View />;
  }
};
