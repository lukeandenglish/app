/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import REDUCER_PATH from '../../config/reducer';
import {useHookUserProfile} from '../../hooks/useHookUserProfile';
import {IUserProfile} from '../../redux/action/register';
import {registerApi} from '../../redux/api/registerApi';
import {Inset, Stack} from '../../styleApp/Spacing';
import {AnimateIInput} from '../../styleApp/UI/AnimatedUIInput';
import {Button} from '../../styleApp/UI/Button';
import {Border, FontSize, Units} from '../../styleApp/Units';
import {default as Color, default as colors} from '../../styleApp/colors';
import {BlockSelect} from './comp/BlockSelect';
import {LoginSign} from './comp/LoginSign';
import {Register} from './comp/Register';

//TODO: SVG ADDED CLOSE

const useButtonRegister = () => {
  const signUpQuery = registerApi.endpoints.signUpQuery as any;
  const loginQuery = registerApi.endpoints.signUpQuery as any;

  const dispatchRedux = useDispatch();

  const [mode, setMode] = React.useState(false);

  const BtnProps = mode
    ? {
        title: t`Login`,
        onPress: () =>
          dispatchRedux(loginQuery.initiate({})).catch(console.info),
      }
    : {
        title: t`Register`,
        onPress: () =>
          dispatchRedux(signUpQuery.initiate({})).catch(console.info),
      };

  return {BtnProps};
};

const LogInOrRegisterScreen = ({disabled}) => {
  const {BtnProps} = useButtonRegister();
  const [state] = useHookUserProfile();
  let [email, password, agreements, RLoading] = useSelector(
    R.pipe(
      R.path([REDUCER_PATH.USER]),
      R.paths([['email'], ['password'], ['agreements'], ['loading']]),
      R.defaultTo(['', '', false, false]),
    ),
  ) as [
    IUserProfile['email'],
    IUserProfile['password'],
    IUserProfile['agreements'],
    IUserProfile['loading'],
  ];
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const emailRef = React.useRef<TextInput | null>(null);

  if (RLoading) {
    disabled = true;
  }

  const isRegister = false;

  const registerEnabled = React.useMemo(() => {
    if (password?.length > 3 && email?.length > 3 && agreements) {
      return false;
    }
    return true;
  }, [email, password, agreements]);

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
          <View>
            <Inset
              horizontal="s16"
              layout={{
                flex: 1,
              }}>
              <BlockSelect disabled={disabled} />
              <Stack size="s32" />
              <View
                style={{
                  height: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.stroke,
                }}
              />
              <Stack size="s32" />
              <AnimateIInput
                ref={emailRef}
                keyboardType="email-address"
                onScrollRef={() => {
                  scrollRef.current?.scrollToEnd();
                }}
                {...state.email}
              />
              {isRegister && <Register />}

              {!isRegister && <LoginSign />}
            </Inset>
          </View>
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
            {...BtnProps}
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
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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

export default LogInOrRegisterScreen;
