import {RV} from '../Utils';

import {Platform} from 'react-native';
import {vh} from 'react-native-viewport-units';

export const ModelSelect = Platform.select({android: 8, ios: 8.2}) as number;
export const isCalcSize = (size: number) =>
  RV((size / ModelSelect) * vh) as number;

export const Units = {
  s1: isCalcSize(1) as 1,
  s10: isCalcSize(10) as 10,
  s100: isCalcSize(100) as 100,
  s11: isCalcSize(11) as 11,
  s12: isCalcSize(12) as 12,
  s14: isCalcSize(14) as 14,
  s16: isCalcSize(16) as 16,
  s18: isCalcSize(18) as 18,

  s2: isCalcSize(2) as 2,
  s20: isCalcSize(20) as 20,
  s22: isCalcSize(22) as 22,
  s24: isCalcSize(24) as 24,

  s30: isCalcSize(30) as 30,
  s32: isCalcSize(32) as 32,
  s36: isCalcSize(36) as 36,

  s4: isCalcSize(4) as 4,
  s40: isCalcSize(40) as 40,
  s44: isCalcSize(44) as 44,
  s48: isCalcSize(48) as 48,

  s50: isCalcSize(50) as 50,
  s52: isCalcSize(52) as 52,

  s56: isCalcSize(56) as 56,
  s6: isCalcSize(6) as 6,
  s64: isCalcSize(64) as 64,

  s7: isCalcSize(7) as 7,
  s72: isCalcSize(72) as 72,

  s8: isCalcSize(8) as 8,
  s80: isCalcSize(80) as 80,
  s86: isCalcSize(86) as 86,

  p_base: isCalcSize(16) as 16,
  p_xl: isCalcSize(20) as 20,
  p_5xl: isCalcSize(24) as 24,
  p_5xs: isCalcSize(8) as 8,
  p_3xl: isCalcSize(22) as 22,
  p_mid: isCalcSize(17) as 17,
  p_xs: isCalcSize(12) as 12,
};

/* border radiuses */
export const Border = {
  br_9xs: isCalcSize(4) as 4,
  br_5xs: isCalcSize(8) as 8,
  br_xs: isCalcSize(12) as 12,
  br_81xl: isCalcSize(100) as 100,
  br_base: isCalcSize(16) as 16,
  br_xl: isCalcSize(20) as 20,
  br_12xs: isCalcSize(1) as 1,
  br_8xs: isCalcSize(5) as 5,
};

export const FontSize = {
  // size_mini: RV(15) as 15,
  // size_3xs: Units.s10,
  // subheading3_size: Units.s16,
  // caption_size: Units.s12,
  // heading1_size: Units.s36,
  // subHeading_size: RV(24) as 24,
  // size_17xl: RV(36) as 36,
  // size_7xl: RV(26) as 26,
  // size_xs: RV(12) as 12,
  // subHeading2_size: RV(20) as 20,
  // size_23xl: RV(42) as 42,
  size_mini: isCalcSize(15) as 15,
  size_3xs: isCalcSize(10) as 10,
  subheading3_size: isCalcSize(16) as 16,
  caption_size: isCalcSize(12) as 12,
  heading1_size: isCalcSize(36) as 36,
  subHeading_size: isCalcSize(24) as 24,
  size_17xl: isCalcSize(36) as 36,
  size_7xl: isCalcSize(26) as 26,
  size_xs: isCalcSize(12) as 12,
  subHeading2_size: isCalcSize(20) as 20,
  size_23xl: isCalcSize(42) as 42,
};
