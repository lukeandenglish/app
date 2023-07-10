type Colors =
  | 'gray_100'
  | 'gray_200'
  | 'gray_300'
  | 'bodySecondary'
  | 'bodyText'
  | 'gray_400'
  | 'gray_500'
  | 'lightInk'
  | 'lightPrimary'
  | 'whitesmoke_100'
  | 'whitesmoke_200'
  | 'stroke'
  | 'actionColor'
  | 'dimgray'
  | 'silver_100'
  | 'lavender'
  | 'gainsboro_100'
  | 'gainsboro_200'
  | 'thistle'
  | 'sucess'
  | 'linen'
  | 'alert'
  | 'lemon'
  | 'coral'
  | 'lightSecondary'
  | 'disabled'
  | 'pink'
  | 'oldlace'
  | 'yellow'
  | 'additional'
  | 'beige'
  | 'greenyellow'
  | 'dot'
  | 'success50'
  | 'transparent'
  | 'faded_flam'
  | 'gray_250'
  | 'gray_350'
  | 'lightsteelblue';

const color = {
  faded_flam: '#FAE0FB',
  gray_100: '#fafafa',
  gray_200: '#909090',
  gray_250: '#92A0BC',
  gray_300: '#98907c',
  gray_350: '#6A6A6A',
  bodySecondary: '#7c7c7c',
  bodyText: '#1d1d1d',
  gray_400: 'rgba(251, 251, 251, 0.92)',
  gray_500: 'rgba(255, 255 , 255, 0.37)',
  lightInk: '#000',
  lightPrimary: '#fff',
  whitesmoke_100: '#f9f9f9',
  whitesmoke_200: '#f5f5f5',
  stroke: '#f0f0f0',
  actionColor: '#2da6ff',
  dimgray: '#636363',
  dot: '#D9D9D9',
  silver_100: '#c8c8c8',
  lavender: '#fae0fb',
  gainsboro_100: '#e6e6e6',
  gainsboro_200: '#e4e4e4',
  thistle: '#d6c7ff',
  sucess: '#51b800',
  success50: ' rgba(81, 184, 0, 0.3)',
  linen: '#f4f0e6',
  alert: '#d42b2b',
  coral: '#ee6f3a',
  lightSecondary: '#aeb3be',
  disabled: '#aeaeae',
  pink: '#ffd0d0',
  oldlace: '#fdf6e7',
  yellow: '#e2f601',
  additional: '#e88baa',
  beige: '#eae6c8',
  greenyellow: '#ccff00',
  lemon: '#E2F601',
  lightsteelblue: '#c0d4ff',
  transparent: 'transparent',
} as Record<Colors, string>;

type CardColor =
  | 'Grey'
  | 'White'
  | 'Black'
  | 'Blue_Sky'
  | 'Faded_Flam'
  | 'Faded_Grass'
  | 'Faded_Grim'
  | 'Faded_Must'
  | 'Faded_Neon'
  | 'Faded_Pep'
  | 'Faded_Purp'
  | 'Faded_Sky'
  | 'Flamingo'
  | 'Grass'
  | 'Grim_Cloud'
  | 'Mustard'
  | 'Neon_Lemon'
  | 'Purple_rain'
  | 'Red_Pepper'
  | 'Yellow';

export const cardColor = {
  Grey: '#92A0BC',
  Blue_Sky: '#79A7FF',
  Faded_Flam: '#FAE0FB',
  Faded_Grass: '#E4F6BE',
  Faded_Grim: '#E7E7E7',
  Faded_Must: '#EAE6C8',
  Faded_Neon: '#FBFFD0',
  Faded_Pep: '#FFD0D0',
  Faded_Purp: '#D6C7FF',
  Faded_Sky: '#C0D4FF',
  Flamingo: '#FF81F6',
  Grass: '#3EC100',
  Grim_Cloud: '#92A0BC',
  Mustard: '#BFB03D',
  Neon_Lemon: '#E2F601',
  Purple_rain: '#A281FF',
  Red_Pepper: '#FE6232',
  Yellow: '#E2F601',
} as Record<CardColor, string>;

import * as R from 'ramda';
export const cardTextColor = R.cond([
  [R.equals(cardColor.Grey), R.always(color.lightPrimary)],
  [R.equals(cardColor.Grim_Cloud), R.always(color.lightPrimary)],
  [R.equals(color.lightPrimary), R.always(color.lightPrimary)],
  [R.equals('#232323'), R.always(color.lightPrimary)],
  [R.F, R.always(color.lightInk)],
  [R.T, R.always(color.lightInk)],
]);

export default color;
