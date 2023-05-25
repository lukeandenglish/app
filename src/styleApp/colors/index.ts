type Colors =
  | 'Violet'
  | 'VioletLight'
  | 'DarkBlue'
  | 'Green'
  | 'GreenLight'
  | 'Yellow'
  | 'YellowLight'
  | 'Red'
  | 'RedLight'
  | 'Grey'
  | 'GreyLight'
  | 'Mustard'
  | 'MastardLight'
  | 'Black'
  | 'Transparent'
  | 'White';

export default {
  Violet: '#A281FF',
  VioletLight: '#D6C7FF',
  DarkBlue: '#79A7FF',
  Green: '#3EC100',
  GreenLight: '#E4F7BE',
  Yellow: '#E2F601',
  YellowLight: '#FBFFD0',
  Red: '#FE6232',
  RedLight: '#FFD0D0',
  Grey: '#92A0BC',
  GreyLight: '#E7E7E7',
  Mustard: '#BFB03D',
  MastardLight: '#EAE6C8',
  Black: '#000000',
  Transparent: 'transparent',
  White: '#FFF',
} as unknown as {[x: Colors | string]: string};
