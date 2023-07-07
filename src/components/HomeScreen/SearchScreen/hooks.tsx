/* eslint-disable no-dupe-keys */
import {t} from '@lingui/macro';
import {useFocusEffect} from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import {homeApi} from '../../../redux/api/homeCard';
import {filterData} from '../Home/hooks';
import {iStackComponent} from './Section/Stack_Component';

const generateMyData = (state: any = {}, data: any[] = []) => {
  state.data = data.map((d, idx) => ({idx, ...d}));
  return state;
};

export const useGetCurrentStack = () => {
  const [play, handlePlayMusic] = usePlaySound();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [videoPage, setPageVideo] = React.useState(0);

  const [state, setState] = React.useState<{
    card: iStackComponent['data'];
    video: iStackComponent['data'];
    user: iStackComponent['data'];
  }>({card: [], video: [], user: []});
  const [added, setAdded] = React.useState<any>([]);

  const updateVideoPage = () => {
    setPageVideo(videoPage + 1);
    loadGreetingVideo();
  };

  const loadGreetingVideo = async () => {
    setLoading(true);
    const video = await registerCallbackEndpoints({
      endpoints: homeApi.endpoints.listLuke,
      dispatch,
      args: {page: videoPage},
    });
    setLoading(false);

    return generateMyData(
      {
        onPressAdd: data => setAdded(R.append(data)(added)),
        emptyIcon: false,
        handlePlayMusic,
        play,
        title: t`Люк подобрал`,
        loading,
        added,
        fetchMore: updateVideoPage,
      },
      filterData(
        R.pipe(
          R.path<iStackComponent['data']>(['data']),
          R.defaultTo([]),
          R.concat(R.pipe(R.path(['video', 'data']), R.defaultTo([]))(state)),
        )(video),
      ),
    );
  };

  const handleInitialState = async () => {
    const video = await loadGreetingVideo();
    setState(video);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleInitialState();
    }, []),
  );

  const data = [
    {
      title: SECTION.HOME.MY_STACK,
      data: [state],
    },
  ];
  return [data];
};
