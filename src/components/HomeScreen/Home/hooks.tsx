/* eslint-disable react-hooks/exhaustive-deps */
import {t} from '@lingui/macro';
import SECTION from '../../../config/section';
import {usePlaySound} from '../../../hooks/usePlaySound';
import {iStackComponent} from './Section/Stack_Component';
import {homeApi} from '../../../redux/api/homeCard';
import {useFocusEffect} from '@react-navigation/native';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import React from 'react';
import {useDispatch} from 'react-redux';
import * as R from 'ramda';

const generateMyData = (state: any = {}, data: any[] = []) => {
  state.data = data.map((d, idx) => ({idx, ...d}));
  return state;
};

const generateVideoData = (state: any = {}, data: any[] = []) => {
  state.data = data.map((d, idx) => ({idx, ...d}));
  return state;
};

const generateLearningData = (state: any = {}, data: any[] = []) => {
  state.data = data.map((d, idx) => ({idx, ...d}));
  return state;
};

export const filterData = data => {
  return [...new Set(data)];
};

export const useGetCurrentStack = () => {
  const [play, handlePlayMusic] = usePlaySound();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [userPage, setPageUser] = React.useState(0);
  const [cardPage, setPageCard] = React.useState(0);
  const [videoPage, setPageVideo] = React.useState(0);

  const [state, setState] = React.useState<{
    card: iStackComponent['data'];
    video: iStackComponent['data'];
    user: iStackComponent['data'];
  }>({card: [], video: [], user: []});

  const updateUserPage = () => {
    setPageUser(userPage + 1);
    loadGreetingList();
  };

  const updateCardPage = () => {
    setPageCard(cardPage + 1);
    loadGreetingCard();
  };

  const updateVideoPage = () => {
    setPageVideo(videoPage + 1);
    loadGreetingVideo();
  };

  const loadGreetingList = async () => {
    setLoading(true);
    let user = await registerCallbackEndpoints({
      endpoints: homeApi.endpoints.listUser,
      dispatch,
      args: {page: userPage},
    });
    setLoading(false);

    return generateMyData(
      {
        onPressAdd: () => null,
        title: t`Мои стэки`,
        emptyIcon: true,
        handlePlayMusic,
        play,
        loading,
        fetchMore: updateUserPage,
      },
      filterData(
        R.pipe(
          R.path<iStackComponent['data']>(['data', 'rows']),
          R.defaultTo([]),
          R.concat(R.pipe(R.path(['user', 'data']), R.defaultTo([]))(state)),
        )(user),
      ),
    );
  };

  const loadGreetingCard = async () => {
    setLoading(true);
    let card = await registerCallbackEndpoints({
      endpoints: homeApi.endpoints.listCard,
      dispatch,
      args: {page: cardPage},
    });

    setLoading(false);

    return generateLearningData(
      {
        onPressAdd: () => null,
        title: t`Подборки с Люком`,
        emptyIcon: false,
        handlePlayMusic,
        play,
        loading,
        fetchMore: updateCardPage,
      },
      filterData(
        R.pipe(
          R.path<iStackComponent['data']>(['data', 'rows']),
          R.defaultTo([]),
          R.concat(R.pipe(R.path(['card', 'data']), R.defaultTo([]))(state)),
        )(card),
      ),
    );
  };

  const loadGreetingVideo = async () => {
    setLoading(true);
    let video = await registerCallbackEndpoints({
      endpoints: homeApi.endpoints.listVideo,
      dispatch,
      args: {page: videoPage},
    });

    setLoading(false);

    return generateVideoData(
      {
        onPressAdd: () => null,
        title: t`Видео с Люком`,
        emptyIcon: false,
        handlePlayMusic,
        play,
        loading,
        fetchMore: updateVideoPage,
      },
      filterData(
        R.pipe(
          R.path<iStackComponent['data']>(['data', 'rows']),
          R.defaultTo([]),
          R.concat(R.pipe(R.path(['video', 'data']), R.defaultTo([]))(state)),
        )(video),
      ),
    );
  };

  const handleInitialState = async () => {
    const user = await loadGreetingList();
    const card = await loadGreetingCard();
    const video = await loadGreetingVideo();
    setState({card, user, video});
  };

  useFocusEffect(
    React.useCallback(() => {
      handleInitialState();
    }, []),
  );

  const dataMerge = React.useMemo(() => {
    let data = [
      {
        title: SECTION.HOME.WLC_STACK,
        data: [{}],
      },
      {
        title: SECTION.HOME.MY_STACK,
        data: [state.user],
      },
    ];

    if (!R.isEmpty(state.card?.data)) {
      data.push({
        title: SECTION.HOME.APPEND_STACK,
        data: [state.card],
      });
    }

    if (!R.isEmpty(state.video?.data)) {
      data.push({
        title: SECTION.HOME.VIDEO_STACK,
        data: [state.video],
      });
    }

    return data;
  }, [state]);

  return [
    dataMerge,
    loading,
    [
      [cardPage, updateCardPage],
      [videoPage, updateVideoPage],
      [userPage, updateUserPage],
    ],
  ];
};

export const useMyWatchList = () => {
  const [state, setState] = React.useState<{
    user: iStackComponent['data'];
  }>({user: []});
  const [loading, setLoading] = React.useState(false);
  const [userPage, setPageUser] = React.useState(0);
  const dispatch = useDispatch();

  const loadGreetingList = async () => {
    setLoading(true);
    let user = await registerCallbackEndpoints({
      endpoints: homeApi.endpoints.listUser,
      dispatch,
      args: {page: userPage},
    });
    setLoading(false);

    return filterData(
      R.pipe(
        R.path<iStackComponent['data']>(['data', 'rows']),
        R.defaultTo([]),
        R.concat(R.pipe(R.path(['user']), R.defaultTo([]))(state)),
      )(user),
    );
  };

  const updateUserPage = () => {
    setPageUser(userPage + 1);
    loadGreetingList();
  };

  const handleInitialState = async () => {
    const user = await loadGreetingList();
    setState({user});
  };

  React.useLayoutEffect(() => {
    handleInitialState();
  }, []);

  return {
    loading,
    data: state.user,
    updateUserPage,
  };
};
