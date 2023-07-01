import React from 'react';
import SoundPlayer from 'react-native-sound-player';
import {useFocusEffect} from '@react-navigation/native';

export const link =
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/13/47/cd/1347cd11-b760-153b-54b8-40bcaeeebd7e/mzaf_944068220625687074.plus.aac.ep.m4a';

export const initialStatePlay = {
  table: null,
  index: null,
  play: false,
};

export const usePlaySound = () => {
  const [play, setPlay] = React.useState<iPlayState>(initialStatePlay);
  const ref = React.useRef<any>(null);

  const unmount = () => {
    ref.current?.stop();
    setPlay(initialStatePlay);
  };

  useFocusEffect(
    React.useCallback(() => {
      ref.current = SoundPlayer;
      ref.current.onFinishedPlaying(() => {
        setPlay(initialStatePlay);
      });
      return () => unmount();
    }, []),
  );

  const handlePlayMusic =
    (index: iPlayState['index'], table: iPlayState['table']) =>
    (playUrl?: string) => {
      ref.current?.stop();
      if (play?.index === index && play?.play === true) {
        setPlay({index, play: false, table});
        ref.current?.stop();
        return;
      }
      if (play?.index === index && play?.play === true) {
        setPlay({index, play: true, table});
        ref.current.play();
        return;
      }

      const linkPlay = playUrl ?? link ?? 'https://example.com/music.mp3';
      ref.current.loadUrl(linkPlay);
      ref.current.onFinishedLoading(() => {
        setPlay({index, play: true, table});
      });
      ref.current.playUrl(linkPlay);
    };

  return [play, handlePlayMusic, unmount];
};

export type iPlayState = {
  index: number | null;
  play: boolean;
  table: string | null;
};

export const isCheck = (
  index: iPlayState['index'],
  play: iPlayState,
  table: iPlayState['table'],
) => {
  return play?.index === index && play?.play && play.table === table;
};
