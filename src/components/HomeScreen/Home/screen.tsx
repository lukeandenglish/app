/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {Dimensions, ListRenderItemInfo, SectionList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import {iListDeckCatalog} from '../../../redux/api/deckCard/helper';
import {Stack} from '../../../styleApp/Spacing';
import {Units} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {Container} from './Container';
import {Stack_Component} from './Stack_Component';
import {Stack_Video_Component} from './Stack_Video_Component';
import {WLC_Component} from './WLC_Component';
import {GroupPlayComponent} from './GroupPlayComponent';

export const WIDTH = Dimensions.get('screen').width;

const ListEmptyDeck = () => {
  return <View style={{flex: 1, backgroundColor: colors.greenyellow}} />;
};
const useGetCurrentStack = () => {
  const ExtraData = {
    onPressAdd: () => null,
    title: t`Мои стэки`,
    handlePlayMusic: () => null,
    data: [
      {
        name: 'Talking contemporary art',
        count: 50,
        countLearn: 23,
        background: '#FFD0D0',
      },
      {
        name: 'High society vocabulary',
        count: 50,
        countLearn: 23,
        background: '#EAE6C8',
      },
    ],
    emptyIcon: false,
  };
  const ExtraPositionData = {
    title: t`Мои стэки`,
    data: [
      {
        name: 'Vocabulary for being a plumber',
        count: 50,
        countLearn: 23,
        background: '#E4F6BE',
      },
      {
        name: 'Talking english to the French',
        count: 50,
        countLearn: 23,
        background: '#92A0BC',
      },
    ],
    emptyIcon: false,
  };
  const ExtraPositionVideoData = {
    title: t`Мои стэки`,
    data: [
      {
        name: 'Let’s speak with australian accent',
        data: '3 дня назад',
        count: 50,
        countLearn: 23,
        background: '#92A0BC',
      },
      {
        name: 'Listen how old people speak',
        data: '3 дня назад',
        count: 50,
        countLearn: 23,
        background: '#92A0BC',
      },
    ],
    emptyIcon: false,
  };

  const data = [
    {
      title: SECTION.HOME.WLC_STACK,
      data: [{}],
    },
    {
      title: SECTION.HOME.MY_STACK,
      data: [ExtraData],
    },
    {
      title: SECTION.HOME.APPEND_STACK,
      data: [ExtraPositionData],
    },
    {
      title: SECTION.HOME.VIDEO_STACK,
      data: [ExtraPositionVideoData],
    },
  ];
  return [data];
};

const renderItem =
  (play, handlePlayMusic) =>
  (render: ListRenderItemInfo<iListDeckCatalog[]>) => {
    console.log(render);
    switch (R.path(['section', 'title'])(render)) {
      case SECTION.HOME.WLC_STACK:
        return <WLC_Component />;
      case SECTION.HOME.MY_STACK:
        return (
          <Stack_Component
            {...render.item}
            emptyIcon={true}
            play={play}
            handlePlayMusic={handlePlayMusic}
          />
        );
      case SECTION.HOME.APPEND_STACK:
        return (
          <View>
            <Stack size="s10" />
            <Stack_Component
              {...render.item}
              play={play}
              handlePlayMusic={handlePlayMusic}
              title={t`Подборка с Люком`}
            />
          </View>
        );
      case SECTION.HOME.VIDEO_STACK:
        return (
          <View>
            <Stack size="s10" />
            <Stack_Video_Component
              {...render.item}
              play={play}
              handlePlayMusic={handlePlayMusic}
              title={t`Видео с Люком`}
            />
          </View>
        );
      default:
        return <View />;
    }
  };

const App = () => {
  const insets = useSafeAreaInsets();
  const sectionListRef = React.useRef<SectionList | null>(null);
  const [data] = useGetCurrentStack();
  const [play, handlePlayMusic] = usePlaySound();

  return (
    <Container notPaddingTop={false} background={colors.lightPrimary}>
      <SectionList
        ref={sectionListRef}
        sections={data}
        extraData={data}
        bounces={false}
        ListEmptyComponent={ListEmptyDeck}
        keyExtractor={(item, index) => [item, index].join('_')}
        renderItem={renderItem(play, handlePlayMusic)}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + Units.s10 * 10,
          backgroundColor: colors.lightPrimary,
        }}
      />
      <GroupPlayComponent />
    </Container>
  );
};

export default App;
