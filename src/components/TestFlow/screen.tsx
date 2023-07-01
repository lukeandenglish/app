import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../styleApp/UI/Button';
import {Units} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {Component} from './Component';
import {Loading} from './Loading';
import {FlatListStick} from './FlatListStick';
import {FlatPreviewStick} from './FlatPreviewStick';
import {Container} from '../../styleApp/UI/Container';

export const DATA = [
  {
    title: t`Какая ваша цель?`,
    desc: t`Выберите несколько, если у вас действительно много целей`,
    value: [
      {
        title: t`Изучить новый язык`,
      },
      {
        title: t`Смотреть фильмы и читать книги`,
      },
    ],
  },
  {
    title: t`Какая ваша цель?`,
    desc: t`Выберите несколько, если у вас действительно много целей`,
    value: [
      {
        title: t`Изучить новый язык`,
      },
      {
        title: t`Смотреть фильмы и читать книги`,
      },
    ],
  },
  {
    title: t`Какая ваша цель?`,
    desc: t`Выберите несколько, если у вас действительно много целей`,
    value: [
      {
        title: t`Изучить новый язык`,
      },
      {
        title: t`Смотреть фильмы и читать книги`,
      },
    ],
  },
  {
    title: t`Какая ваша цель?`,
    desc: t`Выберите несколько, если у вас действительно много целей`,
    value: [
      {
        title: t`Изучить новый язык`,
      },
      {
        title: t`Смотреть фильмы и читать книги`,
      },
    ],
  },
  {
    title: t`Какая ваша цель?`,
    desc: t`Выберите несколько, если у вас действительно много целей`,
    value: [
      {
        title: t`Изучить новый язык`,
      },
      {
        title: t`Смотреть фильмы и читать книги`,
      },
    ],
  },
];

export const PREVIEW_DATA = [
  {
    title: '4000 famous English words',
    count: '3 456 слов',
  },
  {
    title: '4000 famous English words',
    count: '3 456 слов',
  },
];

export const TestFlow = () => {
  const [state, setState] = React.useState<
    number | null | 'loading' | 'preview'
  >('preview');
  const insets = useSafeAreaInsets();

  const handleStartTest = () => {
    if (state >= DATA.length - 1) {
      setState('loading');
      return;
    }
    if (!state) {
      setState(1);
      return;
    }
    setState(state + 1);
  };

  const GoogleStyle = () => {
    switch (state) {
      case null:
        return <Component />;
      case 'loading':
        return <Loading />;
      case 'preview':
        return <FlatPreviewStick state={state} />;
      default:
        return <FlatListStick state={state} />;
    }
  };

  return (
    <Container
      background={
        R.cond([
          [R.isNil, R.always(null)],
          [R.equals('preview'), R.always(null)],
          [R.equals('loading'), R.always(colors.lightsteelblue)],
          [R.T, R.always(colors.lightsteelblue)],
          [R.F, R.always(colors.lightsteelblue)],
        ])(state)
          ? colors.lightsteelblue
          : null
      }>
      <View
        style={{
          flex: 1,
          padding: Units.s16,
          paddingBottom: insets.bottom + Units.s16,
        }}>
        {GoogleStyle()}
        {!R.anyPass([R.equals('loading'), R.equals('preview')])(state) && (
          <Button
            title={state ? t`Next question` : 'Start the test'}
            onPress={handleStartTest}
            styleText={{color: colors.lightPrimary}}
          />
        )}
      </View>
    </Container>
  );
};
