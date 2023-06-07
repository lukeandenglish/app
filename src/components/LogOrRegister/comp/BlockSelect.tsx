import {t} from '@lingui/macro';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerApi} from '../../../redux/api/registerApi';
import {Stack} from '../../../styleApp/Spacing';
import {Button} from '../../../styleApp/UI/Button';
import {LabelText} from '../../../styleApp/UI/LabelText';
import {Border, FontSize, Units} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import LogInOrRegisterScreen from '../screen';

export function BlockSelect({disabled}: {disabled: boolean}) {
  const dispatchRedux = useDispatch();

  const handleSignApple = registerApi.endpoints.handleSignApple as any;
  const handleSignGoogle = registerApi.endpoints.handleSignGoogle as any;

  return (
    <>
      <Stack size="s32" _debug />
      <LabelText
        title={t`Войдите или зарегистрируйтесь`}
        style={Object.assign([styles.text, styles.textPosition])}
      />
      <Stack size="s16" />
      <LabelText
        title={t`Создайте аккаунт, чтобы не потерять свой прогресс на другом устройстве`}
        style={Object.assign([styles.text1, styles.text1Typo])}
      />
      <Stack size="s24" />
      <Button
        disabled={disabled}
        onPress={() => {
          dispatchRedux(handleSignApple.initiate());
        }}
        title={t`Continue with Apple`}
        styleText={{color: colors.lightPrimary}}
        style={{backgroundColor: colors.lightInk}}
      />
      <Stack size="s10" />
      <Button
        disabled={disabled}
        onPress={() => dispatchRedux(handleSignGoogle.initiate())}
        title={t`Sign up with Google`}
        styleText={{color: colors.lightInk}}
        style={{backgroundColor: colors.transparent, borderWidth: 1}}
      />
    </>
  );
}

export const styles = StyleSheet.create({
  checkboxChildLayout: {
    height: 24,
    width: 24,
  },
  textPosition: {
    textAlign: 'center',
  },
  text1Typo: {
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  buttonFlexBox: {
    justifyContent: 'center',
    padding: Units.p_base,
    borderRadius: Border.br_xs,
    alignItems: 'center',
    flexDirection: 'row',
    width: 343,
    left: 16,
  },
  logInOrClr: {
    color: colors.lightPrimary,
    textAlign: 'center',
  },
  fieldLayout: {
    height: 74,
    width: 343,
    left: 16,
    position: 'absolute',
    overflow: 'hidden',
  },
  checkboxFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fdfdfdfTypo: {
    textAlign: 'left',
  },

  text: {
    fontSize: FontSize.heading1_size,
    lineHeight: 40,
    color: colors.lightInk,
  },
  text1: {
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    top: 332,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
  },
  fdfdfdf: {
    textAlign: 'left',
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  fdfdfdfWrapper: {
    top: 22,
    right: '0%',
    left: '0%',
    borderRadius: Border.br_81xl,
    backgroundColor: colors.whitesmoke_100,
    padding: Units.p_xl,
    width: '100%',
  },
  fieldName: {
    fontSize: FontSize.caption_size,
    color: colors.dimgray,
    textAlign: 'left',
    top: 0,
    left: 16,
    position: 'absolute',
  },
  field: {
    top: 443,
  },
  field1: {
    top: 533,
  },
  logInOr: {
    display: 'flex',
    width: 243,
    // fontFamily: FontFamily.graphikMedium,
    fontWeight: '500',
    color: colors.lightPrimary,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: FontSize.subheading3_size,
  },
  button3: {
    top: 745,
    backgroundColor: colors.actionColor,
    position: 'absolute',
  },
  checkboxChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: colors.whitesmoke_200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iAgreeWith: {
    marginLeft: 12,
    textAlign: 'left',
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  checkbox: {},
  logInOrRegister: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
});

export default LogInOrRegisterScreen;
