/* eslint-disable no-dupe-keys */
import {t} from '@lingui/macro';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import {iStackComponent} from './Section/Stack_Component';

const generateMyData = (state: any = {}, data: any[] = []) => {
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

  const data = [
    {
      title: SECTION.HOME.MY_STACK,
      data: [ExtraData],
    },
  ];
  return [data];
};
