/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import * as React from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import REDUCER_PATH from '../../config/reducer';
import {
  IUserProfile,
  actionChangeAgreements,
  actionChangeEmail,
  actionChangePassword,
} from '../../redux/action/register';
import {Inset, Stack} from '../../styleApp/Spacing';
import {AnimateIInput} from '../../styleApp/UI/AnimatedUIInput';
import {Button} from '../../styleApp/UI/Button';
import {Border, FontSize, Units} from '../../styleApp/Units';
import {default as Color, default as colors} from '../../styleApp/colors';

//TODO: SVG ADDED CLOSE

const LogInOrRegister = ({
  handleRegister,
  handleSignGoogleSign,
  handleSignAppele,
  disabled,
  loading,
}) => {
  const dispatch = useDispatch();
  const [email, password, agreements] = useSelector(
    R.pipe(
      R.path([REDUCER_PATH.USER]),
      R.paths([['email'], ['password'], ['agreements']]),
    ),
  ) as [
    IUserProfile['email'],
    IUserProfile['password'],
    IUserProfile['agreements'],
  ];
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const emailRef = React.useRef<TextInput | null>(null);
  const passwordRef = React.useRef<TextInput | null>(null);
  const [state, setState] = React.useState({password: '', email: ''});

  if (loading) {
    disabled = true;
  }

  const registerEnabled = React.useMemo(() => {
    if (password?.length > 3 && email?.length > 3 && agreements) {
      return false;
    }
    return true;
  }, [email, password, agreements]);

  const onChangeEmail = () => {
    if (R.anyPass([R.equals('')])(state.email.trim())) {
      dispatch(actionChangeEmail(state.email));
      passwordRef.current.focus();
      setState({email: '', password: ''});
    }
  };

  const onChangePassword = () => {
    if (R.anyPass([R.equals('')])(state.password.trim())) {
      dispatch(actionChangePassword(state.password));
      Keyboard.dismiss();
      setState({email: '', password: ''});
    }
  };

  const handleCheckboxAgree = () => {
    dispatch(actionChangeAgreements());
  };

  console.log(email, password, registerEnabled);

  return (
    <View style={[{flex: 1, backgroundColor: Color.transparent}]}>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: Border.br_base,
          backgroundColor: colors.lightPrimary,
          borderTopLeftRadius: Border.br_base,
        }}>
        <ScrollView
          bounces={false}
          ref={scrollRef}
          contentContainerStyle={{flexGrow: 1}}>
          <Inset
            horizontal="s16"
            layout={{
              flex: 1,
            }}>
            <View style={{height: Units.s44}}>
              <View />
            </View>
            <Text style={[styles.text, styles.textPosition]}>
              {t`Войдите или зарегистрируйтесь`}
            </Text>
            <Stack size="s16" />
            <Text style={[styles.text1, styles.text1Typo]}>
              {t`Создайте аккаунт, чтобы не потерять свой прогресс на другом устройстве`}
            </Text>
            <Stack size="s24" />
            <Button
              disabled={disabled}
              onPress={handleSignAppele}
              title={t`Continue with Apple`}
              styleText={{color: colors.lightPrimary}}
              style={{backgroundColor: colors.lightInk}}
            />
            <Stack size="s10" />
            <Button
              disabled={disabled}
              onPress={handleSignGoogleSign}
              title={t`Sign up with Google`}
              styleText={{color: colors.lightInk}}
              style={{backgroundColor: colors.transparent, borderWidth: 1}}
            />
            <Stack size="s32" />
            <View
              style={{
                height: 1,
                borderBottomWidth: 1,
                borderColor: colors.stroke,
              }}
            />
            <Stack size="s32" />
            <View
              onTouchEnd={() => {
                scrollRef.current?.scrollToEnd();
              }}>
              <AnimateIInput
                ref={emailRef}
                editable
                keyboardType="email-address"
                onChangeText={(email: string) => {
                  setState({...state, email});
                }}
                placeholder={email}
                returnTypeKey="next"
                blurOnSubmit
                onEndEditing={onChangeEmail}
                onBlur={onChangeEmail}
                onScrollRef={() => {
                  scrollRef.current?.scrollToEnd();
                }}
                value={state?.email}
                placeholderName={t`Mail or telephone`}
              />
              <Stack size="s16" />
              <AnimateIInput
                ref={passwordRef}
                editable
                // secureTextEntry
                keyboardType="default"
                returnTypeKey="next"
                blurOnSubmit
                onEndEditing={onChangePassword}
                onBlur={onChangePassword}
                onChangeText={(password: string) => {
                  setState({...state, password});
                }}
                onScrollRef={() => {
                  scrollRef.current?.scrollToEnd();
                }}
                placeholder={password}
                value={state?.password}
                placeholderName={t`Password`}
              />
            </View>

            <Stack size="s16" />
            <View style={[styles.checkbox, styles.checkboxFlexBox]}>
              <TouchableOpacity
                disabled={disabled}
                onPress={handleCheckboxAgree}
                style={[
                  styles.checkboxChild,
                  styles.checkboxChildLayout,
                  agreements && {backgroundColor: colors.actionColor},
                ]}
              />
              <Text style={[styles.iAgreeWith, styles.fdfdfdfTypo]}>
                {t`I agree with all that`}
              </Text>
            </View>
            <Stack size="s32" />
          </Inset>
        </ScrollView>
        <KeyboardSpacer />
        <Inset
          horizontal="s16"
          vertical="s1"
          layout={StyleSheet.flatten({
            paddingBottom: insets.bottom,
          })}>
          <Button
            disabled={registerEnabled}
            onPress={handleRegister}
            title={t`Register`}
            styleText={{color: colors.lightPrimary}}
            style={Object.assign([
              {
                backgroundColor: colors.actionColor,
              },
            ])}
          />
        </Inset>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxChildLayout: {
    height: 24,
    width: 24,
  },
  textPosition: {
    textAlign: 'center',
  },
  text1Typo: {
    fontSize: FontSize.subheading3_size,
    color: Color.lightInk,
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
    color: Color.lightPrimary,
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
    // fontFamily: FontFamily.graphikRegular,
    textAlign: 'left',
  },

  text: {
    fontSize: FontSize.heading1_size,
    lineHeight: 40,
    // fontFamily: FontFamily.subHeading,
    color: Color.lightInk,
  },
  text1: {
    lineHeight: 22,
    // fontFamily: FontFamily.coFoSansLaModaRegular,
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
    color: Color.lightInk,
  },
  fdfdfdfWrapper: {
    top: 22,
    right: '0%',
    left: '0%',
    borderRadius: Border.br_81xl,
    backgroundColor: Color.whitesmoke_100,
    padding: Units.p_xl,
    width: '100%',
  },
  fieldName: {
    fontSize: FontSize.caption_size,
    color: Color.dimgray,
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
    color: Color.lightPrimary,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: FontSize.subheading3_size,
  },
  button3: {
    top: 745,
    backgroundColor: Color.actionColor,
    position: 'absolute',
  },
  checkboxChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.whitesmoke_200,
  },
  iAgreeWith: {
    marginLeft: 12,
    textAlign: 'left',
    fontSize: FontSize.subheading3_size,
    color: Color.lightInk,
  },
  checkbox: {},
  logInOrRegister: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
});

export default LogInOrRegister;
