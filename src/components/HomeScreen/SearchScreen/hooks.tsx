/* eslint-disable no-dupe-keys */
import {t} from '@lingui/macro';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import {iStackComponent} from './Section/Stack_Component';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import {homeApi} from '../../../redux/api/homeCard';
import * as R from 'ramda';
import {filterData} from '../Home/hooks';

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
  const [added, setAdded] = React.useState<number>([]);

  const updateVideoPage = () => {
    setPageVideo(videoPage + 1);
    loadGreetingVideo();
  };

  const loadGreetingVideo = async () => {
    setLoading(true);
    const video = await registerCallbackEndpoints({
      endpoints: homeApi.endpoints.listVideo,
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
