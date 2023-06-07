/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native';
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
import {Border, FontSize, Units, isCalcSize} from '../../styleApp/Units';
import {default as Color, default as colors} from '../../styleApp/colors';
import {BlockSelect} from './comp/BlockSelect';
import {LoginSign} from './comp/LoginSign';
import {Register} from './comp/Register';
import {RV} from '../../styleApp/Utils';

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
    <View
      style={[
        {
          flex: 1,
          backgroundColor: Color.transparent,
        },
      ]}>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: Border.br_base,
          backgroundColor: colors.lightPrimary,
          borderTopLeftRadius: Border.br_base,
          paddingBottom: insets.bottom,
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
              <Stack size="s16" _debug />
              <View
                style={{
                  height: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.stroke,
                }}
              />
              <Stack size="s32" />
              <View
                onTouchStart={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd();
                  });
                }}>
                <AnimateIInput
                  ref={emailRef}
                  keyboardType="email-address"
                  onScrollRef={() => {
                    setTimeout(() => {
                      scrollRef.current?.scrollToEnd();
                    });
                  }}
                  {...state.email}
                />
                {isRegister && (
                  <Register
                    onFocus={() => {
                      setTimeout(() => {
                        scrollRef.current?.scrollToEnd();
                      });
                    }}
                  />
                )}

                {!isRegister && (
                  <LoginSign
                    onFocus={() => {
                      setTimeout(() => {
                        scrollRef.current?.scrollToEnd();
                      });
                    }}
                  />
                )}
              </View>
            </Inset>
          </View>
        </ScrollView>
        <KeyboardSpacer />
        <Inset
          horizontal="s16"
          bottom="s6"
          _debug
          layout={StyleSheet.flatten({bottom: 0})}>
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
    height: isCalcSize(24),
    width: isCalcSize(24),
  },
  textPosition: {
    textAlign: 'center',
  },
  text: {
    fontSize: FontSize.heading1_size,
    lineHeight: isCalcSize(40),
    color: Color.lightInk,
  },
  button: {
    top: isCalcSize(332),
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
  logInOr: {
    display: 'flex',
    width: isCalcSize(243),
    // fontFamily: FontFamily.graphikMedium,
    fontWeight: '500',
    color: Color.lightPrimary,
    height: isCalcSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: FontSize.subheading3_size,
  },
  checkboxChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.whitesmoke_200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iAgreeWith: {
    marginLeft: isCalcSize(12),
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
