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
  | 'text52'
  | 'text72'
  | 'text24';

export const Typography: Record<FontSize, TextStyle> = {
  text10: {
    fontSize: RV(10),
    lineHeight: RV(12),
  },
  text12: {
    fontSize: RV(12),
    lineHeight: RV(14),
  },
  text14: {
    fontSize: RV(14),
    lineHeight: RV(18),
  },
  text16: {
    fontSize: RV(16),
    lineHeight: RV(20),
  },
  text18: {
    fontSize: RV(18),
    lineHeight: RV(24),
  },
  text20: {
    fontSize: RV(20),
    lineHeight: RV(24),
  },
  text22: {
    fontSize: RV(22),
    lineHeight: RV(24),
  },
  text24: {
    fontSize: RV(24),
    lineHeight: RV(28),
  },
  text52: {
    fontSize: RV(52),
    lineHeight: RV(52),
  },
  text72: {
    fontSize: RV(72),
    lineHeight: RV(72),
  },
};

export const FontFamily = {
  wermut: {fontfamily: 'Wermut'},
  500: {fontfamily: 'Graphik-Regular', fontWeight: '500'},
  400: {fontfamily: 'Graphik-Light', fontWeight: '400'},
  300: {fontfamily: 'Graphik-Thin', fontWeight: '300'},
  600: {fontfamily: 'Graphik-Medium', fontWeight: '600'},
  700: {fontfamily: 'Graphik-Bold', fontWeight: '700'},
};

export const Styles = {
  animateInput: (state: boolean): ViewStyle | TextStyle => ({
    borderColor: state ? colors.white : colors.white,
    borderRadius: Units.s6,
    color: colors.white,
    fontWeight: '500',
    paddingBottom: Platform.select({
      android: Units.s4,
      ios: Units.s10,
    }),
    paddingTop: 0,
  }),
  animateInputContainer: (state: boolean): ViewStyle | TextStyle => ({
    borderColor: state ? colors.white : colors.white,
    borderRadius: Units.s6,
    borderWidth: 1,
    flex: 1,
    maxHeight: 60,
    minHeight: 60,
    paddingHorizontal: Units.s10,
  }),
  button: {
    color: colors.white,
    fontWeight: '600',
    letterSpacing: 0,
    padding: 0,
  },
  cardModalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '60%',
  },
  customDescriptionText: {
    color: colors.white,
    lineHeight: 20,
    marginTop: 0,
    textTransform: 'none',
  },
  customInput: {
    color: colors.white,
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
    color: colors.white,
    lineHeight: 20,
    marginTop: 0,
    textTransform: 'none',
  },
  headerModalText: {
    color: colors.white,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 0,
    textAlign: 'center',
    textTransform: 'none',
  },
  headerText: {
    color: colors.white,
    fontWeight: '600',
    letterSpacing: 1,
    padding: 0,
  },
  headerWrapper: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: Units.s1,
    borderColor: colors.white,
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
    color: colors.white,
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
  inputSearchContainer: (state: boolean): ViewStyle | TextStyle => ({
    // borderWidth: Units.s1,
    color: colors.white,
    flex: 1,
  }),
  inputSingleContainer: (state: boolean): ViewStyle | TextStyle => ({
    borderColor: state ? colors.white : colors.white,
    borderRadius: Units.s6,
    borderWidth: Units.s1,
    flexDirection: 'row',
    width: '100%',
  }),
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: Units.s1,
    borderColor: colors.white,
    borderTopWidth: Units.s1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: Units.s56,
    minHeight: Units.s56,
  },
  textAnimatePlaceholder: {
    color: colors.white,
    fontWeight: '400',
  },
  textError: {
    color: colors.white,
    fontWeight: '300',
    letterSpacing: 0,
    ...Typography.text14,
  },
  textPlaceholder: {
    color: colors.white,
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
