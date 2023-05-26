import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Units} from '../Units';

export const Sizes = {
  buttonCircle: Units.s40,
  buttonHeight: Units.s56,
  buttonHitSlop: {
    bottom: Units.s10,
    left: Units.s10,
    right: Units.s10,
    top: Units.s10,
  },
  buttonRadius: Units.s100,
  buttonSmallHeight: Units.s36,
  buttonSmallWidth: Units.s100 + Units.s64,
  headerHeight: Units.s64,
  notification: Units.s50,
  rightMenuWidth: Units.s14 + Units.s52,

  tabBarHeight: Units.s64,
} as const;

export const Styles = StyleSheet.create({
  absoluteBottom: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  absoluteBottomSafe: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  absoluteTop: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  border: {
    borderColor: Colors.border,
    borderWidth: 1,
  },
  borderBottom: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  borderBottomLight: {
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 0.5,
  },
  borderLight: {
    borderColor: Colors.borderLight,
    borderWidth: 0.5,
  },
  borderTop: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
  borderTopLight: {
    borderTopColor: Colors.borderLight,
    borderTopWidth: 0.5,
  },
  buttonCircle: {
    alignItems: 'center',
    borderRadius: Sizes.buttonRadius,
    height: Sizes.buttonCircle,
    justifyContent: 'center',
    width: Sizes.buttonCircle,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  chevronDown: {
    transform: [{rotateZ: '90deg'}],
  },
  colsb: {
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  displayNone: {
    display: 'none',
  },
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%',
  },
  modalHandleContainerStyle: {
    height: Units.s4,
    justifyContent: 'center',
    padding: 0,
    paddingBottom: Units.s16,
    paddingTop: Units.s8,
  },
  modalHandleStyle: {
    backgroundColor: Colors.textMuted,
    width: Units.s32,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowcenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowend: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rowsb: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowsbend: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowsbstart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowstart: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  screenContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    flexGrow: 1,
  },
  selfCenter: {
    alignSelf: 'center',
  },
});
