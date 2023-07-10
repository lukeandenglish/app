/* eslint-disable no-dupe-keys */
import {PortalHost} from '@gorhom/portal';
import {t} from '@lingui/macro';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React from 'react';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import * as R from 'ramda';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import {homeApi} from '../../../redux/api/homeCard';
import {useDispatch} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

export const useGetCurrentStack = () => {
  const [play, handlePlayMusic] = usePlaySound();
  const route = useRoute();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({});
  const [change, setChange] = React.useState('');
  const ref = React.useRef<ReturnType<typeof TextInput> | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      setState(R.pipe(R.path(['params']), R.defaultTo({}))(route));
    }, [route]),
  );

  const isAdmin = R.path(['data', 'admin'])(state);
  const stackId = R.path(['data', 'id'])(state);
  const color = R.path(['data', 'color'])(state);
  const description =
    R.path(['data', 'description'])(state) ??
    "Sir Charles Spencer Chaplin KBE was an English comic actor, filmmaker, and composer who rose to fame in the era of silent film. He became a worldwide icon through his screen persona, the Tramp, and is considered one of the film industry's most important figures.";
  const title = R.pipe(R.path(['data', 'title']), R.defaultTo(''))(state);
  const image = R.pipe(R.path(['data', 'photo']), R.defaultTo(''))(state);
  const author = R.pipe(
    R.path(['data', 'userId']),
    R.defaultTo('by Luke English'),
  )(state);

  const dataOriginCards = R.pipe(
    R.path(['data', 'cards']),
    R.defaultTo([]),
  )(state);
  const dataCards = dataOriginCards.reduce(
    (acc, cur) => {
      acc.push({
        card: true,
        translate: cur.title,
        title: cur.translate,
        play,
        cur,
        handlePlayMusic: (index: number, table: string) => () => {
          try {
            handlePlayMusic && handlePlayMusic(index, table)(cur.voice.url);
          } catch (e) {
            console.log(e);
          }
        },
        onPressAdd: handleOnPressAdd,
      });
      return acc;
    },
    !isAdmin
      ? [
          {
            card: false,
            play,
            component: () => (
              <>
                <PortalHost name="AddedNewWord" />
              </>
            ),
          },
        ]
      : [],
  );

  const ExtraData = {
    image,
    title,
    author,
  };
  const ExtraResultData = {
    learn: {
      count: '0 %',
      title: t`Стэка выучено`,
    },
    summary: {
      count: [dataOriginCards?.length].join('').trim(),
      title: t`Слов в стэке`,
    },
  };
  const handleOnPressAdd = e => console.log(e);

  const ExtraPositionData = {
    description,
    isAdmin,
    stackId,
    inputDescription: {
      ref: ref,
      multiline: true,
      numberOfLines: 10,
      placeholder: t`+ Тапните чтобы добавить описание`,
      onChangeText: setChange,
      value: change,
      save: change.length > 0,
      handleSaveDescription: () => console.log('Save description'),
    },
    onRefetch: () => {
      if (stackId) {
        registerCallbackEndpoints({
          endpoints: homeApi.endpoints.currentStack,
          dispatch,
          args: {stackId},
        })
          .then(setState)
          .catch(e => console.log(e));
      }
    },
    count: [dataOriginCards?.length].join(''),
    data: dataCards ?? [],
    onCopy: () =>
      registerCallbackEndpoints({
        endpoints: homeApi.endpoints.addedFavour,
        dispatch,
        args: {stackId},
      }),
    onAddedFavour: () =>
      registerCallbackEndpoints({
        endpoints: homeApi.endpoints.copyStack,
        dispatch,
        args: {stackId},
      }),
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
  return [data, color];
};
