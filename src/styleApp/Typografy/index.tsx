import {Platform, TextStyle, ViewStyle} from 'react-native';
import {Units} from '../Units';
import {RV} from '../Utils';
import colors from '../colors';

export type FontWeightNumericValues =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export const fontWeightsAndroid: Record<
  FontWeightNumericValues,
  'normal' | 'bold'
> = {
  100: 'normal',
  200: 'normal', // 'Extra Light',
  300: 'normal',
  400: 'normal',
  500: 'normal', // 'Medium',
  600: 'bold',
  700: 'bold', // 'Bold',
  800: 'bold', // 'ExtraBold',
  900: 'bold', // 'Black',
};

export type FontSize =
  | 'text10'
  | 'text12'
  | 'text14'
  | 'text16'
  | 'text18'
  | 'text20'
  | 'text22'
  | 'text24'
  | 'text30'
  | 'text38'
  | 'text52'
  | 'text72';

export const FontFamily = {
  wermut: {fontFamily: 'Wermut'},
  500: {fontFamily: 'GraphikLCG-Regular', fontWeight: '500'},
  400: {fontFamily: 'GraphikLCG-Light', fontWeight: '400'},
  300: {fontFamily: 'GraphikLCG-Thin', fontWeight: '300'},
  600: {fontFamily: 'GraphikLCG-Medium', fontWeight: '600'},
  700: {fontFamily: 'GraphikLCG-Bold', fontWeight: '700'},
} as {[x: string]: TextStyle};

export const Typography: Record<FontSize, TextStyle> = {
  text10: {
    fontSize: RV(10),
    lineHeight: RV(12),
    ...FontFamily['500'],
  },
  text12: {
    fontSize: RV(12),
    lineHeight: RV(14),
    ...FontFamily['500'],
  },
  text14: {
    fontSize: RV(14),
    lineHeight: RV(18),
    ...FontFamily['500'],
  },
  text16: {
    fontSize: RV(16),
    lineHeight: RV(20),
    ...FontFamily['500'],
  },
  text18: {
    fontSize: RV(18),
    lineHeight: RV(24),
    ...FontFamily['500'],
  },
  text20: {
    fontSize: RV(20),
    lineHeight: RV(24),
    ...FontFamily['500'],
  },
  text22: {
    fontSize: RV(22),
    lineHeight: RV(24),
    ...FontFamily['500'],
  },
  text24: {
    fontSize: RV(24),
    lineHeight: RV(28),
    ...FontFamily['500'],
  },
  text30: {
    fontSize: RV(30),
    lineHeight: RV(38),
    ...FontFamily['500'],
  },
  text38: {
    fontSize: RV(38),
    lineHeight: RV(40),
    ...FontFamily['500'],
  },
  text52: {
    fontSize: RV(52),
    lineHeight: RV(52),
    ...FontFamily['500'],
  },
  text72: {
    fontSize: RV(72),
    lineHeight: RV(72),
    ...FontFamily['500'],
  },
};

export const Styles = {
  animateInput: (state: boolean): ViewStyle | TextStyle => ({
    borderColor: state ? colors.lightInk : colors.lightInk,
    borderRadius: Units.s6,
    color: colors.lightInk,
    fontWeight: '500',
    paddingBottom: Platform.select({
      android: Units.s4,
      ios: Units.s10,
    }),
    paddingTop: 0,
  }),
  animateInputContainer: (state: boolean): ViewStyle | TextStyle => ({
    borderColor: state ? colors.lightInk : colors.lightInk,
    borderRadius: Units.s6,
    borderWidth: 1,
    flex: 1,
    maxHeight: 60,
    minHeight: 60,
    paddingHorizontal: Units.s10,
  }),
  button: {
    color: colors.lightInk,
    fontWeight: '600',
    letterSpacing: 0,
    padding: 0,
  },
  cardModalView: {
    backgroundColor: colors.lightInk,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '60%',
  },
  customDescriptionText: {
    color: colors.lightInk,
    lineHeight: 20,
    fontFamily: 'Wermut',
    marginTop: 0,
    textTransform: 'none',
  },
  customInput: {
    color: colors.lightInk,
    flex: 1,
    fontWeight: '500',
    paddingBottom: Platform.select({
      android: Units.s6,
      ios: Units.s12,
    }),
    paddingHorizontal: Units.s10,
    paddingTop: Platform.select({
      android: Units.s4,
      ios: Units.s10,
    }),
  },
  customText: {
    color: colors.lightInk,
    lineHeight: 20,
    marginTop: 0,
    textTransform: 'none',
  },
  headerModalText: {
    color: colors.lightInk,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 0,
    textAlign: 'center',
    textTransform: 'none',
  },
  headerText: {
    color: colors.lightInk,
    fontWeight: '600',
    letterSpacing: 1,
    padding: 0,
  },
  headerWrapper: {
    alignItems: 'center',
    backgroundColor: colors.lightInk,
    borderBottomWidth: Units.s1,
    borderColor: colors.lightInk,
    borderTopWidth: Units.s1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Units.s8,
    maxHeight: Units.s72,
    position: 'relative',
    minHeight: Units.s72,
    width: '100%',
  },
  historyText: {
    color: colors.lightInk,
    fontWeight: '500',
    letterSpacing: 0,
    ...Typography.text14,
  },
  iconClose: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  inputSearchContainer: (): ViewStyle | TextStyle => ({
    // borderWidth: Units.s1,
    color: colors.lightInk,
    flex: 1,
  }),
  inputSingleContainer: (state: boolean): ViewStyle | TextStyle => ({
    borderColor: state ? colors.lightInk : colors.lightInk,
    borderRadius: Units.s6,
    borderWidth: Units.s1,
    flexDirection: 'row',
    width: '100%',
  }),
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: colors.lightInk,
    borderBottomWidth: Units.s1,
    borderColor: colors.lightInk,
    borderTopWidth: Units.s1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: Units.s56,
    minHeight: Units.s56,
  },
  textAnimatePlaceholder: {
    color: colors.lightInk,
    fontWeight: '400',
  },
  textError: {
    color: colors.lightInk,
    fontWeight: '300',
    letterSpacing: 0,
    ...Typography.text14,
  },
  textPlaceholder: {
    color: colors.lightInk,
    fontWeight: '400',
  },
  titleText: {
    ...Typography.text20,
    alignItems: 'center',
    letterSpacing: 0,
  },
} as {
  [x: string]: ViewStyle | TextStyle;
} & {
  animateInput: (e: boolean) => ViewStyle | TextStyle;
  animateInputContainer: (e: boolean) => ViewStyle | TextStyle;
  inputSearchContainer: (e: boolean) => ViewStyle | TextStyle;
  inputSingleContainer: (e: boolean) => ViewStyle | TextStyle;
};
