/* eslint-disable no-dupe-keys */
import {t} from '@lingui/macro';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import {iStackComponent} from './Section/Stack_Component';

const generateMyData = (state: any = {}, data: any[] = []) => {
  state.data = data;
  return state;
};

const generateVideoData = (state: any = {}, data: any[] = []) => {
  state.data = data;
  return state;
};

const generateLearningData = (state: any = {}, data: any[] = []) => {
  state.data = data;
  return state;
};

export const useGetCurrentStack = () => {
  const [play, handlePlayMusic] = usePlaySound();

  const ExtraData = generateMyData(
    {
      onPressAdd: () => null,
      title: t`Мои стэки`,
      emptyIcon: true,
      handlePlayMusic,
      play,
    },
    [
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
  ) as iStackComponent;
  const ExtraPositionData = generateLearningData(
    {
      onPressAdd: () => null,
      title: t`Подборки с Люком`,
      emptyIcon: false,
      handlePlayMusic,
      play,
    },
    [
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
  ) as iStackComponent;
  const ExtraPositionVideoData = generateVideoData(
    {
      onPressAdd: () => null,
      title: t`Видео с Люком`,
      emptyIcon: false,
      handlePlayMusic,
      play,
    },
    [
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
  ) as iStackComponent;

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
