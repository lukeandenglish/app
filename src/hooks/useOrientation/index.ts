import {useWindowDimensions} from 'react-native';

export const useLandscape = () => {
  const {height, width} = useWindowDimensions();

  const isLandscape = width > height;
  return {
    isLandscape,
  };
};
