import * as R from 'ramda';
import React from 'react';
import {View} from 'react-native';
import {iListItem} from '../../../redux/api/deckCard/helper';
import {AnimatedViewBlock} from '../../../styleApp/animate/AnimatedViewBlock';
import CardScene from './renderItem/CardScene';
import CardSmallScene from './renderItem/CardSmallScene';
import Preview from './renderItem/Preview';

export type iChangeMode = 'fullCard' | 'smallCard';
export type iChangeSmallCard = 'preview' | 'card';

export const ChangeMode = ['fullCard', 'smallCard'] as iChangeMode[];
export const ChangeScene = ['preview', 'card'] as iChangeSmallCard[];
export const getCurrentScene = R.pipe(
  R.path<iChangeSmallCard>(['item', 'scene']),
  R.defaultTo(null),
);

export const getCurrentMode = R.pipe(
  R.path<iChangeSmallCard>(['item', 'mode']),
  R.defaultTo(null),
);

export const Card = React.memo(
  ({mode, scene, cardLength, title}: iListItem) => {
    console.log(cardLength, title);
    switch (mode) {
      case ChangeMode[0]:
        return (
          <AnimatedViewBlock>
            <CardScene cardLength={cardLength} title={title} />
          </AnimatedViewBlock>
        );
      case ChangeMode[1]:
        switch (scene) {
          case ChangeScene[0]:
            return (
              <AnimatedViewBlock>
                <Preview cardLength={cardLength} title={title} />
              </AnimatedViewBlock>
            );
          case ChangeScene[1]:
            return (
              <AnimatedViewBlock>
                <CardSmallScene cardLength={cardLength} title={title} />
              </AnimatedViewBlock>
            );
          default:
            return <View />;
        }
      default:
        return <View />;
    }
  },
);
