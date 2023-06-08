/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import * as R from 'ramda';
import * as React from 'react';
import {Pressable, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import REDUCER_PATH from '../../config/reducer';
import {useButtonRegister} from '../../hooks/useButtonRegister';
import {useHookUserProfile} from '../../hooks/useHookUserProfile';
import {useIsVisibleKeyboard} from '../../hooks/useIsVisibleKeyboard';
import {IUserProfile} from '../../redux/api/registerApi/type';
import {Inset, Stack} from '../../styleApp/Spacing';
import {FontFamily, Styles} from '../../styleApp/Typografy';
import {AnimateIInput} from '../../styleApp/UI/AnimatedUIInput';
import {Button} from '../../styleApp/UI/Button';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Border, FontSize, Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';

const LogInOrRegisterScreen = ({disabled = false}: {disabled?: boolean}) => {
  const {ReceiveEmail} = useButtonRegister();
  const {isKeyboardVisible} = useIsVisibleKeyboard();
  const [state] = useHookUserProfile();
  const navigation = useNavigation();
  let [email, password, agreements] = useSelector(
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

  const registerEnabled = React.useMemo(() => {
    if (password?.length > 3 && email?.length > 3 && agreements) {
      return false;
    }
    return true;
  }, [email, password, agreements]);

  const moveToButton = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    });
  };

  return (
    <View style={[styles.wrapper]}>
      <View
        style={[
          styles.blc,
          {
            paddingBottom: insets.bottom,
          },
        ]}>
        <ScrollView
          bounces={false}
          ref={scrollRef}
          contentContainerStyle={styles.cnt}>
          <Inset horizontal="s16" top="s16">
            <Pressable
              onPress={navigation.goBack}
              style={[Styles.iconClose, {borderWidth: 1}]}>
              <View />
            </Pressable>
          </Inset>
          <View>
            <Inset horizontal="s16" layout={styles.insctx}>
              <Stack size="s16" />
              <LabelText
                title={t`Забыли пароль?`}
                style={Object.assign([
                  styles.text,
                  styles.textPosition,
                  styles.textLeft,
                  FontFamily.wermut,
                ])}
              />
              <Stack size="s16" />
              <LabelText
                title={t`Введите вашу почту и мы вышлем инструкция по восстановлению пароля`}
                style={Object.assign([
                  styles.text1,
                  styles.text1Typo,
                  styles.textLeft,
                  FontFamily.wermut,
                ])}
              />
              <Stack size="s24" />
              <Stack size="s16" />
              <View onTouchStart={moveToButton}>
                <AnimateIInput
                  ref={emailRef}
                  keyboardType="email-address"
                  onScrollRef={moveToButton}
                  {...state.email}
                />
              </View>
            </Inset>
          </View>
        </ScrollView>
        <KeyboardSpacer />
        <Inset
          horizontal="s16"
          bottom="s6"
          layout={StyleSheet.flatten(
            Object.assign([
              styles.btnMode,
              isKeyboardVisible && {display: 'none'},
            ]),
          )}>
          <Button
            disabled={registerEnabled}
            {...ReceiveEmail}
            styleText={styles.btnclr}
            style={Object.assign([
              {
                backgroundColor: colors.actionColor,
              },
              isKeyboardVisible && {display: 'none'},
            ])}
          />
        </Inset>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textLeft: {textAlign: 'left'},
  btnMode: {bottom: 0},
  btnclr: {color: colors.lightPrimary},
  insctx: {
    flex: 1,
  },
  btnswn: {
    width: isCalcSize(20),
    height: isCalcSize(20),
  },
  swm: {
    position: 'absolute',
    right: 0,
    top: -isCalcSize(30),
    flexDirection: 'row',
  },
  line: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: colors.stroke,
  },
  cnt: {flexGrow: 1},
  wrapper: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  blc: {
    flex: 1,
    borderTopRightRadius: Border.br_base,
    backgroundColor: colors.lightPrimary,
    borderTopLeftRadius: Border.br_base,
  },
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
    color: colors.lightInk,
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
    color: colors.lightInk,
  },
  text1Typo: {
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
    fontWeight: '300',
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
  logInOr: {
    display: 'flex',
    width: isCalcSize(243),
    fontWeight: '500',
    color: colors.lightPrimary,
    height: isCalcSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: FontSize.subheading3_size,
  },
  text1: {
    lineHeight: 22,
    textAlign: 'center',
  },
  checkboxChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: colors.whitesmoke_200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iAgreeWith: {
    marginLeft: isCalcSize(12),
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
