/* eslint-disable no-dupe-keys */
import {PortalHost} from '@gorhom/portal';
import {t} from '@lingui/macro';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import * as R from 'ramda';

export const useGetCurrentStack = () => {
  const [play, handlePlayMusic] = usePlaySound();
  const route = useRoute();

  const ExtraData = {
    image: '',
    title: '',
    author: '',
  };
  const ExtraResultData = {
    learn: {
      count: '32%',
      title: t`Стэка выучено`,
    },
    summary: {
      count: '49',
      title: t`Слов в стэке`,
    },
  };
  const handleOnPressAdd = e => console.log(e);

  const ExtraPositionData = {
    description:
      "Sir Charles Spencer Chaplin KBE was an English comic actor, filmmaker, and composer who rose to fame in the era of silent film. He became a worldwide icon through his screen persona, the Tramp, and is considered one of the film industry's most important figures.",
    count: '49',
    handlePlayMusic,
    data: R.reject(R.anyPass([R.isNil, R.isEmpty]))([
      route?.params?.isMy === true
        ? {
            card: false,
            play,
            component: () => <PortalHost name="AddedNewWord" />,
          }
        : null,
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },

      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
      {
        card: true,
        title: 'Harangue',
        translate: 'Разглагольство',
        play,
        onPressAdd: handleOnPressAdd,
      },
    ]),
  };

  const data = [
    {
      title: SECTION.CARD.MY_IMAGE,
      data: [ExtraData],
    },
    {
      title: SECTION.CARD.MY_RESULT,
      data: [ExtraResultData],
    },
    {
      title: SECTION.CARD.MY_COLLECTION,
      data: [ExtraPositionData],
    },
  ];
  return [data];
};
