/* eslint-disable react-native/no-inline-styles */
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {
  Dimensions,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';

const DATA = [
  {
    title: 'Мои колоды',
    data: ['Most important English phrases'],
  },
  {
    title: 'Рекомендации',
    data: ['Most important English phrases'],
  },
  {
    title: 'Другие колоды',
    data: ['Most important English phrases'],
  },
  {
    title: 'Новые темы',
    data: ['French Fries'],
  },
  {
    title: 'От редакции',
    data: ['French Fries'],
  },
];

import {Inset} from '../../../styleApp/Spacing';
import {LabelText} from '../../../styleApp/UI/LabelText';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import colors from '../../../styleApp/colors';
import CardScene from './itemCard/CardScene';
import CardSmallScene from './itemCard/CardSmallScene';
import Preview from './itemCard/Preview';
import {Units} from '../../../styleApp/Units';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const WIDTH = Dimensions.get('screen').width;

const Card = ({mode, scene}) => {
  switch (mode) {
    case 'fullCard':
      return <CardScene />;
    case 'smallCard':
      switch (scene) {
        case 'preview':
          return <Preview />;
        default:
          return <CardSmallScene />;
      }
  }
};

const App = () => {
  const insets = useSafeAreaInsets();
  const renderItem = React.useCallback(() => {
    return (
      <FlashList
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Units.s12,
          backgroundColor: colors.lightPrimary,
        }}
        renderItem={props => {
          return <Card mode={props.card ?? 'smallCard'} />;
        }}
        getItemType={() => {
          return Math.random().toString();
        }}
        data={DATA}
      />
    );
  }, []);

  return (
    <SectionList
      sections={DATA}
      bounces={false}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.lightPrimary,
      }}
      renderSectionHeader={({section: {title}}) => (
        <Inset
          horizontal="s16"
          bottom="s6"
          top="s12"
          layout={StyleSheet.flatten({
            backgroundColor: colors.lightPrimary,
          })}>
          <LabelText
            title={title}
            style={Object.assign([
              Typography.text38,
              {textAlign: 'left', letterSpacing: 1.2},
              {color: colors.lightInk, fontWeight: '300'},
              FontFamily.wermut,
            ])}
          />
        </Inset>
      )}
    />
  );
};

export default App;
